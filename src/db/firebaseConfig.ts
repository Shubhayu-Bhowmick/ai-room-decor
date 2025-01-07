// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "my-awesome-project-2709.firebaseapp.com",
  projectId: "my-awesome-project-2709",
  storageBucket: "my-awesome-project-2709.firebasestorage.app",
  messagingSenderId: "861146413192",
  appId: "1:861146413192:web:bcde7b335f708ddcf1c73d",
  measurementId: "G-W5XQZ5V8C2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app); 