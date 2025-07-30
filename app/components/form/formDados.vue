<template>
  <div>
    <input v-model="name" placeholder="seu titulo ou seus nomes" />
    <input type="date" v-model="date" />
    <button @click="enviar" :disabled="!name || !date">Próximo</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['proximo'])
const name = ref('')
const date = ref('')

function enviar() {
  emit('proximo', { name: name.value, date: date.value })
}
</script>
