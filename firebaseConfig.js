// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfDngGYjsBf3AUniL3kr4Zz4QPKVuaK4E",
  authDomain: "travelapp-2a48a.firebaseapp.com",
  projectId: "travelapp-2a48a",
  storageBucket: "gs://travelapp-2a48a.appspot.com/",
  messagingSenderId: "274777467067",
  appId: "1:274777467067:web:f0523d33289709e885619e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

