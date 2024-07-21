import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "ankasa-ticketing-27e54.firebaseapp.com",
  projectId: "ankasa-ticketing-27e54",
  storageBucket: "ankasa-ticketing-27e54.appspot.com",
  messagingSenderId: "598654796154",
  appId: "1:598654796154:web:430abf39f8e2119411d6c3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
