// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBacoCugwOYYd3TMjuQ8Ji7jOjbzghvE0",
  authDomain: "journal-app-122f2.firebaseapp.com",
  projectId: "journal-app-122f2",
  storageBucket: "journal-app-122f2.appspot.com",
  messagingSenderId: "406513344096",
  appId: "1:406513344096:web:afb8f54b6a4a2448f4ed05"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);