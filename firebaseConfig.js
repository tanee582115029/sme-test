import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Cloud Firestore through Firebase
if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: "AIzaSyCDyIqOP0rsBGp6yGCuYbg99gLspjJTCOE",
        authDomain: "sme-test-68dec.firebaseapp.com",
        databaseURL: "https://sme-test-68dec.firebaseio.com",
        projectId: "sme-test-68dec",
        storageBucket: "sme-test-68dec.appspot.com",
        messagingSenderId: "12347818631",
        appId: "1:12347818631:web:69c3337e51d520c535ee22",
        measurementId: "G-J6D2S1089H"
    }
    firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()