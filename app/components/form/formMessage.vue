<template>
  <div>
    <textarea v-model="message" placeholder="Digite sua mensagem..." />
    <button @click="enviar" :disabled="!message">Finalizar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['proximo'])
const message = ref('')

function enviar() {
  emit('proximo', { message: message.value })
}
</script>
