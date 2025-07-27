<script setup lang="ts">
import { getFirebaseAuth } from "../../server/api/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getFirebaseAuth();

const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    await navigateTo('/page2')
  } catch (error) {
    console.error("Erro ao logar:", error);
  }
};
</script>

<template>
  <div>
    <h2>Login</h2>
    <button @click="googleLogin">Entrar com Google</button>
  </div>
</template>

