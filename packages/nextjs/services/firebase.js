// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpRaoFUMZbXVW3v93J3fMCwubTFwItSFg",
  authDomain: "wanderers-eth.firebaseapp.com",
  projectId: "wanderers-eth",
  storageBucket: "wanderers-eth.appspot.com",
  messagingSenderId: "390258108262",
  appId: "1:390258108262:web:90ecdba66cf31ac6490aa7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);