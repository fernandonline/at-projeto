<template>
  <div>
    <input type="file" @change="handleUpload" />
    <p v-if="base64">Imagem processada</p>
    <button @click="enviar" :disabled="!base64">Próximo</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['proximo'])
const base64 = ref('')

function handleUpload(e) {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    base64.value = reader.result
    // ou envie pro Cloudinary e salve a URL
  }
  reader.readAsDataURL(file)
}

function enviar() {
  emit('proximo', { imageUrl: base64.value })
}
</script>
