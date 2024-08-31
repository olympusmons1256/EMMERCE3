import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCuR1JSFawB_fzyU5lbVC2LAp_M7_Ten1s",
    authDomain: "odyssey-studio-b87c5.firebaseapp.com",
    projectId: "odyssey-studio-b87c5",
    storageBucket: "odyssey-studio-b87c5.appspot.com",
    messagingSenderId: "125288376515",
    appId: "1:125288376515:web:d9b5977845aefbe0d31a76",
    measurementId: "G-8YMYY7E1MY"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function testFirebaseConnection() {
  try {
    // Test authentication
    await signInAnonymously(auth);
    console.log('Anonymous authentication successful');

    // Test Firestore connection
    const querySnapshot = await getDocs(collection(db, 'test_collection'));
    console.log('Firestore connection successful. Documents in test_collection:', querySnapshot.size);

    return true;
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return false;
  }
}

// Run the test
testFirebaseConnection().then(result => {
  if (result) {
    console.log('Firebase connection test passed');
  } else {
    console.log('Firebase connection test failed');
  }
});