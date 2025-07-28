import { initializeApp } from "firebase/app";
import { useRuntimeConfig } from "#imports";

const config = useRuntimeConfig();
const firebaseConfig = {
    apiKey: config.public.fbApiKey,
    authDomain: config.public.fbAuthDomain,
    projectId: config.public.fbProjectId,
    storageBucket: config.public.fbStorageBucket,
    messagingSenderId: config.public.fbMessagingSenderId,
    appId: config.public.fbAppId,
    measurementId: config.public.fbMeasurementId,
};

const app = initializeApp(firebaseConfig);
export {app};