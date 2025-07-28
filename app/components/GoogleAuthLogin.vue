<script setup lang="ts">
import { entrarComGoogle } from "../../server/api/firebase/authentication";

async function fazerLogin() {
  const user = await entrarComGoogle();
  if (!user) {
    alert("Falha no login");
    return;
  }

  // envia pro seu backend Nuxt/Nitro
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (res.ok) {
    alert("Login efetuado e usuário cadastrado no MongoDB!");
    // aqui você pode redirecionar ou salvar no store
  } else {
    const err = await res.text();
    alert("Erro ao cadastrar: " + err);
  }
}
</script>

<template>
  <button @click="fazerLogin">Login com Google</button>
</template>

