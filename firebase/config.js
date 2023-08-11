import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdnCtzPHjswBQm38iBuTGzseAr8BMo5dY",
  authDomain: "awesome-project-social.firebaseapp.com",
  databaseURL: "https://awesome-project-social.firebaseio.com",
  projectId: "awesome-project-social",
  storageBucket: "awesome-project-social.appspot.com",
  messagingSenderId: "1076897576657",
  appId: "1:1076897576657:web:5259cf22d360a11463b7f0",
  measurementId: "G-6TQKV3VWGK",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
