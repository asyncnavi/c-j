import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

//  Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyC5k4qzEoQMo974B68AFcPGfyAOb9nttc8',
    authDomain: 'coding-jutsu-30c25.firebaseapp.com',
    projectId: 'coding-jutsu-30c25',
    storageBucket: 'coding-jutsu-30c25.appspot.com',
    messagingSenderId: '878927153783',
    appId: '1:878927153783:web:77718b8aa7a06431081472',
    measurementId: 'G-Y0JHVBX0R9',
}

/**
 * Default Firebase app
 */
const app = firebase.initializeApp(firebaseConfig)

/**
 * Firebase auth
 */
const auth = firebase.auth()

/**
 * Firebase database
 */
const db = firebase.firestore()

/**
 * Firebase storage
 */
const storage = firebase.storage()
// Exposing instance we need...
export { app, auth, db, storage }
