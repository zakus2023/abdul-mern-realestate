// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "abdul-mern-estate.firebaseapp.com",
  projectId: "abdul-mern-estate",
  storageBucket: "abdul-mern-estate.appspot.com",
  messagingSenderId: "683387580922",
  appId: "1:683387580922:web:1fbd8a5900f5985754f443"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);