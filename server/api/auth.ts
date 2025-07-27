import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, signOut } from "firebase/auth";
import { useRuntimeConfig } from "#imports";

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

export function getFirebaseAuth(): Auth {
  if (!app) {
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
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  }
  return auth!;
}

export async function firebaseLogout(): Promise<void> {
  const authInstance = getFirebaseAuth();
  try {
    await signOut(authInstance);
    console.log("Usuário deslogado com sucesso!");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
}
