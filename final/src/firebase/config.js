import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCSiFX2D8u0Mc0NuLrr9xvu8TVCkXU2N4Q",
    authDomain: "proyectofinal-7b8c5.firebaseapp.com",
    projectId: "proyectofinal-7b8c5",
    storageBucket: "proyectofinal-7b8c5.appspot.com",
    messagingSenderId: "626703033369",
    appId: "1:626703033369:web:90ad97677912beb6093688",
    measurementId: "G-GZFB7ZWWSZ"
  };

app.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const storage= app.storage();
export const db = app.firestore();