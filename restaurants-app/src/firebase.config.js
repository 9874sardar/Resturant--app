import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANkA7LRMWvCCdMGw5mKY67C5eAHep1o1c",
  authDomain: "restaurantsapp-5c6e9.firebaseapp.com",
  databaseURL: "https://restaurantsapp-5c6e9-default-rtdb.firebaseio.com",
  projectId: "restaurantsapp-5c6e9",
  storageBucket: "restaurantsapp-5c6e9.appspot.com",
  messagingSenderId: "228876923767",
  appId: "1:228876923767:web:a9a4fb06bdf002e2ece772",
};

const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
