import * as firebase from 'firebase'

var config = {
    apiKey: process.env.DB_FB_APIKEY,
    authDomain: "jv-cheat-sheets.firebaseapp.com",
    databaseURL: "https://jv-cheat-sheets.firebaseio.com",
    projectId: "jv-cheat-sheets",
    storageBucket: "jv-cheat-sheets.appspot.com",
    messagingSenderId: "281883264847"
}

firebase.initializeApp(config)

const database = firebase.database()

export {database}