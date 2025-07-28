<script setup lang="ts">
  import { logout } from "../../server/api/firebase/authentication";
  const handleLogout = async () => {
    try {
      logout();
        await navigateTo('/')
    } catch (error) { }
  };
</script>

<template>
    <button @click="handleLogout">Sair</button>
</template>