<script setup lang="ts">
import { ref } from 'vue';
import QRCode from 'qrcode';
import { getAuth } from 'firebase/auth';
import { app } from '../../server/api/firebase/fb';

const title = ref('')
const message = ref('')
const date = ref('')

async function enviarMensagem() {
  const auth = getAuth(app)
  const user = auth.currentUser

  if (!user) {
    alert('Você precisa estar logado com o Google.')
    return
  }

  const idToken = await user.getIdToken()

  const publicLinkId = Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
  const publicLink = `https://seusite.com/mensagem/${publicLinkId}`

  const publicLinkQR = await QRCode.toDataURL(publicLink)

  const res = await fetch('../../server/api/messages/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify({
      title: title.value,
      message: message.value,
      date: date.value,
      publicLink,
      publicLinkQR
    })
  })

  if (res.ok) {
    alert('Mensagem criada!')
  } else {
    const err = await res.json()
    alert('Erro: ' + err.message)
  }
}
</script>

<template>
  <form @submit.prevent="enviarMensagem">
    <input v-model="title" placeholder="Título" required />
    <textarea v-model="message" placeholder="Mensagem" required />
    <input type="date" v-model="date" required />

    <button type="submit">Criar mensagem</button>
  </form>
  <GoogleAuthLogout/>
</template>