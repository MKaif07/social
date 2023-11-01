// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "social-345cb.firebaseapp.com",
  projectId: "social-345cb",
  storageBucket: "social-345cb.appspot.com",
  messagingSenderId: "17890444849",
  appId: "1:17890444849:web:33e0df069f318e99557710",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
