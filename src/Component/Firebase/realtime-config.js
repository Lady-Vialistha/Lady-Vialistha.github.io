import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
    getFirestore,
    getDoc,
    setDoc,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    deleteField,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCOOOZqVwSSagQ2caUiwJoC4Raev1AXzhk",
    authDomain: "todolist-141aa.firebaseapp.com",
    databaseURL: "https://todolist-141aa-default-rtdb.firebaseio.com",
    projectId: "todolist-141aa",
    storageBucket: "todolist-141aa.appspot.com",
    messagingSenderId: "239377588279",
    appId: "1:239377588279:web:2f2def875dd202b1da9fb2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;