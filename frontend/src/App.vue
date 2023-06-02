<script setup>
import { computed } from 'vue';
import HeaderM from './components/main/header.vue'
import MainM from './components/main/main.vue'
import FooterM from './components/main/footer.vue';

import { useUserStore } from './stores/user.js'

const store = useUserStore()

const user = computed(() => store.user)
</script>

<template>
  <HeaderM />
  <MainM v-if="!user.nickname"/>


  <router-view v-if="user.nickname" v-slot="{ Component }">
    <transition 
      enter-active-class="animate__animated animate__slideInRight"
      leave-active-class="animate__animated animate__slideOutRight"
      mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>


  <FooterM />
</template>

<style scoped>
.animate__animated.animate__slideInRight {
  --animate-duration: 0.1s;
}
.animate__animated.animate__slideOutRight {
  --animate-duration: 0.1s;
}
</style>
