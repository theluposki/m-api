<template>
  <div class="loading-container">
    <div class="loading-spinner"></div>
    <div class="loading-text">Carregando...</div>
  </div>
</template>

<style scoped>

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: auto;
  user-select: none;
}

.loading-spinner {
  border: 4px solid var(--dark);
  border-top: 4px solid var(--blue-l);
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-weight: bold;
  color: var(--blue-l);
  font-size: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
