import { database } from '../database/config'

export function startAddingPost(post) {
    return (dispatch) => {
        return database.ref('posts').update({ [post.id]: post }).then(() => {
            dispatch(addPost(post))
        }).catch((error) => {
            console.log(error)
        }) //note [] trick
    }
}

export function startLoadingPost() {
    return (dispatch) => {
        // .on always listen to db for changes, .once checks once
        return database.ref('posts').once('value').then((snapshot) => {
            let posts = []
            snapshot.forEach((childSnapshot) => {
                posts.push(childSnapshot.val())
            })
            dispatch(loadPosts(posts))
        }).catch((error) => {
            console.log(error)
        })
    }
}

export function startRemovingPost(index, id) {

    // remove just post, not related comments
    // return (dispatch) => {
    //     return database.ref(`posts/${id}`).remove().then(() => {
    //         dispatch(removePost(index))
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }
    const updates = {
        [`posts/${id}`]: null,
        [`comments/${id}`]: null
    }
    /* this specifies the paths that we want to update to null 
    (basically delete)
    we're navigating to the post with id we clicked remove on, 
    as well as the comments belonging to that post, with 
    that same id. */

    return (dispatch) => {
        return database.ref().update(updates).then(() => {
            dispatch(removePost(index))
        }).catch((error) => {
            console.log(error)
        })
    }
    /*finally, we're updating the database from its root node, such
    that it navigates to the posts path, as well as the comments
    path, and  sets them to null ! (in other words, deletes both
        of them). 
        After deleting the post and its comments from the database,
        like always, we're updating
        the ui by dispatching an action to our reducer 
        inside of .then() */
}


export function startAddingComment(comment, postId) {
    return (dispatch) => {
        return database.ref('comments/' + postId).push(comment).then(() => {
            dispatch(addComment(comment, postId))
        }).catch((error) => {
            console.log(error)
        })
    }
}

export function startLoadingComments() {
    return (dispatch) => {
        // .on always listen to db for changes, .once checks once
        return database.ref('comments').once('value').then((snapshot) => {
            let comments = {} //posts was array. comments is object
            snapshot.forEach((childSnapshot) => {
                //using Object.values because we dont need the keys from the db
                comments[childSnapshot.key] = Object.values(childSnapshot.val())
            })
            dispatch(loadComments(comments))
        }).catch((error) => {
            console.log(error)
        })
    }
}




export function removePost(index) {
    return {
        type: 'REMOVE_POST',
        index //es6 shortcut. matches parameter, so same as below
        // index: index
    }
}

export function addPost(post) {
    return {
        type: 'ADD_POST',
        post
    }
}

export function addComment(comment, postId) {
    return {
        type: 'ADD_COMMENT',
        comment,
        postId
    }
}

export function loadPosts(posts) {
    return {
        type: 'LOAD_POSTS',
        posts
    }
}

export function loadComments(comments) {
    return {
        type: 'LOAD_COMMENTS',
        comments
    }
}
