import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./fb";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function entrarComGoogle() {
  try {
    const res = await signInWithPopup(auth, provider);
    const u = res.user;
    return {
      uid: u.uid,
      email: u.email,
      name: u.displayName
    };
  } catch (e) {
    console.error("Erro no login Google:", e);
    return null;
  }
}
export function logout() {
  auth.signOut();
}