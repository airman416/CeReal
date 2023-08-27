// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDBYgnRU1PmlO2wefUtyzN3OJ43wu0PR-w",
    authDomain: "computer-bereal-f0c5e.firebaseapp.com",
    projectId: "computer-bereal-f0c5e",
    storageBucket: "computer-bereal-f0c5e.appspot.com",
    messagingSenderId: "1078996320302",
    appId: "1:1078996320302:web:8cec7104db6d300c3b1fbf",
    measurementId: "G-4VFQVWVGPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;