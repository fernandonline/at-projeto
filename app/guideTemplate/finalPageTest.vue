<template>
  <div class="surprise-page-container">
    <div v-if="loading" class="loading-message">
      Carregando sua surpresa...
    </div>
    <div v-else-if="error" class="error-message">
      <p>Ocorreu um erro ao carregar a surpresa: {{ error }}</p>
      <p>Verifique o link ou tente novamente mais tarde.</p>
    </div>
    <div v-else-if="surprise" class="surprise-content">
      <h1>{{ surprise.title }}</h1>
      <p class="message">{{ surprise.message }}</p>
      <p v-if="surprise.specialDate" class="special-date">Data Especial: {{ 
formatDate(surprise.specialDate) }}</p>
      <div class="media-gallery">
        <div v-for="(mediaItem, index) in surprise.media" :key="index" 
class="gallery-item">
          <img :src="mediaItem.url" :alt="mediaItem.caption || 'Imagem da surpresa'" class="gallery-image">
          <p v-if="mediaItem.caption" class="gallery-caption">{{ 
mediaItem.caption }}</p>
        </div>
      </div>
      <!-- Você pode adicionar mais elementos aqui com base no templateId -->
      <!-- Ex: <component :is="getTemplateComponent(surprise.templateId)" 
:data="surprise" /> -->
    </div>
    <div v-else class="not-found-message">
      <p>Surpresa não encontrada.</p>
      <p>O link pode estar incorreto ou a surpresa foi removida.</p>    </div>
  </div>
 </template>
 <script setup>
 import { ref, onMounted } from 'vue';
 import { useRoute } from 'vue-router';
 const route = useRoute();
 const surprise = ref(null);
 const loading = ref(true);
 const error = ref(null);
 const fetchSurprise = async () => {
  try {
    const slug = route.params.slug;
    if (!slug) {
      error.value = 'Slug da surpresa não fornecido.';
      return;
    }
    const response = await $fetch(`/api/messages/${slug}`);
    if (response.status === 200) {
      surprise.value = response.body;
    } else {
      error.value = response.message || 'Não foi possível carregar a surpresa.';
    }
  } catch (err) {
    console.error('Erro ao buscar surpresa:', err);
    error.value = 'Ocorreu um erro ao carregar a surpresa.';
  } finally {
    loading.value = false;
  }
 };
 const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
 };
 onMounted(() => {
  fetchSurprise();
 });
 </script>