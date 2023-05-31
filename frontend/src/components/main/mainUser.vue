<script setup>
import { computed } from 'vue';
import { useUserStore } from '../../stores/user.js'

const store = useUserStore()

const user = computed(() => store.user)
</script>

<template>
  <main class="main">
    <img :src="user.picture" alt="imagem de perfil" loading="lazy">
    <h1>{{ user.nickname }}</h1>
  </main>
</template>

<style scoped>
.main {
  min-height: calc(100vh - 74.4px);
  max-height: calc(100vh - 74.4px);
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--dark2);
  color: var(--white);
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
  color: var(--blue-l);
  font-size: 5rem;
}

.feature-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 40px auto;
  padding: 40px;

  /* background-color: red; */
  max-width: 80%;
}

.feature {
  display: flex;
  flex-direction: column;
}

.feature h2 {
  color: var(--blue-l);
}
</style>
