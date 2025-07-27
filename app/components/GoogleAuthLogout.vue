<script setup lang="ts">
import { firebaseLogout } from "../../server/api/auth";


const handleLogout = async () => {
  try {
    await firebaseLogout();
    // Opcional: redirecionar o usuário ou limpar o estado local após o logout
        await navigateTo('/')
  } catch (error) {

  }
};
</script>

<template>
  <div>
    <button @click="handleLogout">Sair</button>
  </div>
</template>