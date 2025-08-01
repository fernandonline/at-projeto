import { initializeApp } from "firebase/app";

const firebaseConfig = {

  apiKey: "AIzaSyCJmqutVSPc-CYiqbLpe1enJ5MhlQLdTS4",

  authDomain: "auth-amote.firebaseapp.com",

  projectId: "auth-amote",

  storageBucket: "auth-amote.firebasestorage.app",

  messagingSenderId: "818522531568",

  appId: "1:818522531568:web:1286d3d98acb404a658435",

  measurementId: "G-L9460W2Y25"

};

const app = initializeApp(firebaseConfig);
export { app };
