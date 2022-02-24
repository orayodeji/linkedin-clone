// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import auth from "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqpypleDAMu2Aqxa7z1lsX_jhnaC9-8X0",
  authDomain: "linkedin-clone-2dce5.firebaseapp.com",
  projectId: "linkedin-clone-2dce5",
  storageBucket: "linkedin-clone-2dce5.appspot.com",
  messagingSenderId: "460619915687",
  appId: "1:460619915687:web:333c5c64a7a9c297f0d682",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);
// const popUpMethod = signInWithPopup();

export { auth, provider, storage };
export default db;
