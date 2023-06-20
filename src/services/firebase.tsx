// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwNkSovPLK01YTGjCh7Bf3WQTlPwUCK10",
  authDomain: "rede-social-144ff.firebaseapp.com",
  projectId: "rede-social-144ff",
  storageBucket: "rede-social-144ff.appspot.com",
  messagingSenderId: "32442767564",
  appId: "1:32442767564:web:66ca387ed82bd76258ca69",
  measurementId: "G-W57BLT1SB0",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const db = getFirestore(firebase);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
export default firebase;