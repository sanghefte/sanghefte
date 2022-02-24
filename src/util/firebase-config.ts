import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkn5kYiULXFNptCXoxRK2L_DlsHj_ZO_4",
  authDomain: "sang-firebase-test.firebaseapp.com",
  databaseURL:
    "https://sang-firebase-test-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sang-firebase-test",
  storageBucket: "sang-firebase-test.appspot.com",
  messagingSenderId: "146151998654",
  appId: "1:146151998654:web:d4295a7e63169a22a34aef",

  measurementId: "G-RBH92XFPE6",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
