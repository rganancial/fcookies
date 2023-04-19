// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1eyzw7PW8gQ2oIY72XlmMpca9Rc5V2EU",
    authDomain: "fcookies-7d140.firebaseapp.com",
    projectId: "fcookies-7d140",
    storageBucket: "fcookies-7d140.appspot.com",
    messagingSenderId: "348098137021",
    appId: "1:348098137021:web:6e0c0d7efb8eb77964e0d4",
    measurementId: "G-LB94CHTV3T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);