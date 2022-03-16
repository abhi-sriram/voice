import { initializeApp, getApps } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  QuerySnapshot,
  DocumentData,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
   limit,
   where
} from "firebase/firestore/lite";

import { getAuth,signInWithEmailAndPassword,signOut,} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCl26PvUj-i9G7o7eOmiigTuXSptRdLliQ",
    authDomain: "voice-61e00.firebaseapp.com",
    projectId: "voice-61e00",
    storageBucket: "voice-61e00.appspot.com",
    messagingSenderId: "1085417191440",
    appId: "1:1085417191440:web:1e84c33519fffce22cf295",
    measurementId: "G-CER2FG659V"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

const auth = getAuth(app);



export {
  db,
  collection,
  addDoc,
  setDoc,
  getDocs,
  orderBy,
  query,
  doc,
  getDoc,
  serverTimestamp,
  QuerySnapshot,
  DocumentData,
  updateDoc,
  auth,
  signInWithEmailAndPassword,
  signOut,
  deleteDoc,
  limit,
  where
};