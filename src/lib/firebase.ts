import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCyygnDL8eEIyeWiC1N7gCx-XnkSe8POro",
    authDomain: "siliconblizz.firebaseapp.com",
    projectId: "siliconblizz",
    storageBucket: "siliconblizz.firebasestorage.app",
    messagingSenderId: "1067537177701",
    appId: "1:1067537177701:web:4570c60d56ef5ba1a9ba8c",
    measurementId: "G-V63EBEBE7F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
