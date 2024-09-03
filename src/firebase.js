// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWNturG6djSs7_F6WOXP8g3opVZnh4nbQ",
  authDomain: "futmaker-9ea22.firebaseapp.com",
  projectId: "futmaker-9ea22",
  storageBucket: "futmaker-9ea22.appspot.com",
  messagingSenderId: "356979904063",
  appId: "1:356979904063:web:800353246fe56227e6f28a",
  measurementId: "G-DHSBGSRC30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default app;
