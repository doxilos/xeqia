import firebase from "firebase"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: "motions-3dea6",
    storageBucket: "motions-3dea6.appspot.com",
    messagingSenderId: "331365299390",
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: "G-4P270YDLDG",
}

export const app = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore(app)
