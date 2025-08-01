<script setup>
import { ref } from 'vue';

const emit = defineEmits(['proximo'])
const imageUrl = ref('')
const status = ref('')

async function handleUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'amote-upload')

  status.value = 'enviando'

  try {
    const res = await fetch(process.env.NUXT_PUBLIC_CLOUD_UPLINK, {
      method: 'POST',
      body: formData
    })

    const data = await res.json()
    imageUrl.value = data.secure_url
    status.value = 'ok'
  } catch (e) {
    console.error(e)
    status.value = 'erro'
  }
}

function enviar() {
  emit('proximo', { imageUrl: imageUrl.value === 'ok'})
}
</script>

<template>
  <div>
    <input name="image" type="file" id="fileName" accept="image/*" @change="handleUpload"/>
    <p v-if="status === 'ok'">Imagem enviada!</p>
    <p v-if="status === 'erro'">Erro no upload 😥</p>
    <button @click="enviar" :disabled="!imageUrl">Próximo</button>
  </div>
</template>