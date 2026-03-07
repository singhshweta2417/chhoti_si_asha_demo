import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8ENBaUebvewNj64_7ffbquRIKZov36WY",
  authDomain: "demoproject-5be32.firebaseapp.com",
  projectId: "demoproject-5be32",
  storageBucket: "demoproject-5be32.firebasestorage.app",
  messagingSenderId: "155684719825",
  appId: "1:155684719825:web:1c31c6f60aca0415bbc9f0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;