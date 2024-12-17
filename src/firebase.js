import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAZm_UV2CV69fQvoReHh6PoEWONyJCK_eY",
  authDomain: "netflix-clone-30382.firebaseapp.com",
  projectId: "netflix-clone-30382",
  storageBucket: "netflix-clone-30382.firebasestorage.app",
  messagingSenderId: "1095229305642",
  appId: "1:1095229305642:web:23bb194e91e42860356453",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    toast.success("Signup successful!");
  } catch (error) {
    console.log(error);
    toast.error(error.code?.split("/")[1]?.split("-").join(" ") || "Signup failed");
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
  } catch (error) {
    console.log(error);
    toast.error(error.code?.split("/")[1]?.split("-").join(" ") || "Login failed");
  }
};

const logout = () => {
  signOut(auth)
    .then(() => toast.success("Logged out successfully!"))
    .catch((error) => toast.error("Logout failed"));
};


export { auth, db, login, signup, logout };
