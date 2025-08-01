<template>
  <div v-if="mensagem">
    <h1>{{ mensagem.title }}</h1>
    <p><strong>Data:</strong> {{ mensagem.date }}</p>

    <div v-if="mensagem.imageUrl">
      <img :src="mensagem.imageUrl" alt="Imagem" style="max-width: 400px;" />
    </div>

    <p><strong>Mensagem:</strong></p>
    <p>{{ mensagem.message }}</p>

    <div v-if="mensagem.publicLinkQR">
      <p><strong>QR Code:</strong></p>
      <img :src="mensagem.publicLinkQR" alt="QR Code" style="max-width: 200px;" />
    </div>
  </div>

  <div v-else-if="loading">
    <p>Carregando...</p>
  </div>

  <div v-else>
    <p>Mensagem não encontrada 😢</p>
  </div>
  <GoogleAuthLogout/>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import GoogleAuthLogout from '@/components/login/GoogleAuthLogout.vue'

interface Mensagem {
  title: string
  date?: string
  message: string
  imageUrl?: string
  publicLink?: string
  publicLinkQR?: string
}

const route = useRoute()
const mensagem = ref<Mensagem | null>(null)
const loading = ref(true)

onMounted(async () => {
  const id = route.params.id

  try {
    const res = await fetch(`/api/messages/${id}`)
    if (res.ok) {
      mensagem.value = await res.json()
    } else {
      mensagem.value = null
    }
  } catch (err) {
    console.error('Erro ao buscar a mensagem:', err)
    mensagem.value = null
  } finally {
    loading.value = false
  }
})
</script>
