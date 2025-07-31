// Import required Firebase modules
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

// ✅ Your Firebase project configuration
const firebaseConfig = {
  // It's better to store API keys in environment variables during production for security.
  apiKey: "AIzaSyCHrJq8njrV1IYT485k5XI6QZ475Dg80j4",
  authDomain: "loginsinghjiistore.firebaseapp.com",
  projectId: "loginsinghjiistore",
  storageBucket: "loginsinghjiistore.firebasestorage.app",
  messagingSenderId: "88645216287",
  appId: "1:88645216287:web:f24f87428b16c574f34d2a"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Auth
const auth = getAuth(app);

// ✅ Set up Google Auth Provider
const provider = new GoogleAuthProvider();

// ✅ Export auth and provider to use in your app
export { auth, provider };
