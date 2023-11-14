// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKs8D1QzDxO8j5gJBRC1i5_AkECn8da7A",
  authDomain: "react-poke-sangw.firebaseapp.com",
  projectId: "react-poke-sangw",
  storageBucket: "react-poke-sangw.appspot.com",
  messagingSenderId: "545838158689",
  appId: "1:545838158689:web:4d2c65f3fc75577f1b6b20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;