<script setup>
import { ref, onMounted } from "vue";

const textLogo = ref("Technology");

const textLogoLoop = () => {
  const texts = ["Technology", "Innovation", "Security", "uncensored"];

  async function delayLoop() {
    while (true) {
      for (const item of texts) {
        textLogo.value = item;
        await new Promise((resolve) => setTimeout(resolve, 12000));
      }
    }
  }

  delayLoop();
};

onMounted(() => {
  textLogoLoop();
});
</script>

<template>
  <div class="logo">
    <span class="title" :data-text="textLogo"> MyReb </span>
  </div>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 4px;
}

.title {
  position: relative;
  color: var(--blue-l);
  font-weight: 700;
  font-size: 3rem;
  user-select: none;
}

.title::after {
  position: absolute;
  content: attr(data-text);
  font-size: 0.8rem;
  bottom: 0;
  right: 0;
  animation: rotateY 6s linear infinite;
  transform-origin: center;
}

@keyframes rotateY {
  0% {
    transform: rotateX(0deg);
    opacity: 1;
  }
  50% {
    transform: rotateX(360deg);
    opacity: 0.5;
  }
  100% {
    transform: rotateX(360deg);
    opacity: 1;
  }
}
</style>
