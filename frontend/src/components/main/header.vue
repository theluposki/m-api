<script setup>
import { ref, onMounted } from "vue";
import Login from "../login/login.vue"
import Logup from"../login/logup.vue"
const textLogo = ref("Technology");

let isVisibleLogin = ref(false);
let isVisibleLogup = ref(false);

const textLogoLoop = () => {
  const texts = ["Technology", "Innovation", "Security", "uncensored"];

  async function delayLoop() {
    while (true) {
      for (const item of texts) {
       textLogo.value = item
        await new Promise((resolve) => setTimeout(resolve, 12000));
      }
    }
  }

  delayLoop();
};

onMounted(() => {
  textLogoLoop();
});

const showLogin = () => {
  if (isVisibleLogin.value) {
    isVisibleLogin.value = false
    isVisibleLogup.value = false
  } else {
    isVisibleLogin.value = true
    isVisibleLogup.value = false
  }
}

const showLogup = () => {
  if (isVisibleLogup.value) {
    isVisibleLogup.value = false
    isVisibleLogin.value = false
  } else {
    isVisibleLogup.value = true
    isVisibleLogin.value = false
  }
}
</script>

<template>
  <header class="header">
    <div class="logo">
      <span class="title" :data-text="textLogo"> MyReb </span>
    </div>

    <div class="btns-login">
      <a href="" @click.prevent="showLogup">
        <span v-if="!isVisibleLogup">abrir conta</span>
        <i class='bx bx-x' v-else></i>
      </a>
      <button @click="showLogin">
        <span v-if="!isVisibleLogin">
          Entrar
        </span>
        <i class='bx bx-x' v-else></i>
      </button>
    </div>

    <transition 
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      mode="out-in">
      <Logup v-if="isVisibleLogup" />
    </transition>

    <transition 
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      mode="out-in">
      <Login v-if="isVisibleLogin"/>
    </transition>
  </header>
</template>

<style scoped>
.header {
  min-height: 60px;
  padding: 0 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: var(--white);
  background-color: var(--dark);
}

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

.btns-login {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btns-login a {
  text-decoration: none;
  color: var(--blue-l);
  font-weight: 200;

  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.btns-login a:hover {
  transition: all ease .2s;
  font-weight: 400;
}

.btns-login button {
  border: solid 1px var(--dark);
  background-color: var(--blue-l);
  color: var(--dark);
  padding: 8px 16px;
  max-height: 33px;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

button i {
  font-size: 28px;
}

a i {
  font-size: 28px;
}

.btns-login button:hover {
  transition: all ease .2s;
  opacity: 0.95;
}
.btns-login button:active {
  scale: 0.96;
}
</style>
