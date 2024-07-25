import {initializeApp, initializeServerApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig: FirebaseOptions = {
    // @ts-expect-error
    apiKey: import.meta.env.VITE_API_KEY,
    // @ts-expect-error
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    // @ts-expect-error
    projectId:import.meta.env.VITE_PROJECT_ID,
    // @ts-expect-error
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    // @ts-expect-error
    messagingSenderId:import.meta.env.VITE_MESSAGING_SENDER_ID,
    // @ts-expect-error
    appId: import.meta.env.VITE_API_ID,
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  export { auth };