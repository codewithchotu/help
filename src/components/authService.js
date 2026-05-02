// src/authService.js
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// 🔹 Signup
export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Signup successful!");
    return { ok: true, user: userCredential.user };
  } catch (error) {
    alert("Signup failed: " + error.message);
    return { ok: false, error: error.message };
  }
};

// 🔹 Login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    return { ok: true, user: userCredential.user };
  } catch (error) {
    alert("Login failed: " + error.message);
    return { ok: false, error: error.message };
  }
};

// 🔹 Logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
    alert("You have been logged out!");
    window.location.reload();
  } catch (error) {
    alert("Logout failed: " + error.message);
  }
};
