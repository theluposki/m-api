<script setup>
import { computed } from "vue";
import { useUserStore } from '../../stores/user.js'

const store = useUserStore()

const isVisibleLogin = computed(() => store.isVisibleLogin)
const isVisibleLogup = computed(() => store.isVisibleLogup)

const showLogin = () => {
  store.setIsVisibleLogin()
}

const showLogup = () => {
  store.setIsVisibleLogup()
}
</script>

<template>
  <div class="btns-login">
    <a href="" @click.prevent="showLogup">
      <span v-if="!isVisibleLogup">abrir conta</span>
      <i class="bx bx-x" v-else></i>
    </a>
    <button @click="showLogin">
      <span v-if="!isVisibleLogin"> Entrar </span>
      <i class="bx bx-x" v-else></i>
    </button>
  </div>
</template>

<style scoped>

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
