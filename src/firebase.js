import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCuR1JSFawB_fzyU5lbVC2LAp_M7_Ten1s",
  authDomain: "odyssey-studio-b87c5.firebaseapp.com",
  projectId: "odyssey-studio-b87c5",
  storageBucket: "odyssey-studio-b87c5.appspot.com",
  messagingSenderId: "125288376515",
  appId: "1:125288376515:web:d9b5977845aefbe0d31a76",
  measurementId: "G-8YMYY7E1MY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics };

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is signed in:", user.uid);
  } else {
    console.log("User is signed out");
  }
}, (error) => {
  console.error("Auth state change error:", error);
});