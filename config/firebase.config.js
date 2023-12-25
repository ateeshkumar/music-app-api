// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc-eyBU2uRmemstYHmnnK7_f8RHcy8__k",
  authDomain: "music-e8511.firebaseapp.com",
  projectId: "music-e8511",
  storageBucket: "music-e8511.appspot.com",
  messagingSenderId: "10408416812",
  appId: "1:10408416812:web:5a14e44bf4eb427db1a389",
  measurementId: "G-D80C46RRM1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
