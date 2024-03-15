// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyATmsPSGx0HPtBjF9jaxJqaFd9TkjlkYlI",
  authDomain: "theservify-e1a5a.firebaseapp.com",
  projectId: "theservify-e1a5a",
  storageBucket: "theservify-e1a5a.appspot.com",
  messagingSenderId: "674296473100",
  appId: "1:674296473100:web:8826acac298bce98b7b029",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
export const auth = getAuth(app);

