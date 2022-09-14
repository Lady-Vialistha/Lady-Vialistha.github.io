import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAYILbRkKpWXKb69mKl1sqItXlXus6lFr8",
    authDomain: "data-ktp.firebaseapp.com",
    databaseURL: "https://data-ktp-default-rtdb.firebaseio.com",
    projectId: "data-ktp",
    storageBucket: "data-ktp.appspot.com",
    messagingSenderId: "330285420251",
    appId: "1:330285420251:web:abccd513e32af962c046fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;