<script setup>
import { computed } from "vue";
import { useUserStore } from '../../stores/user.js'
import Navi from "./Navi.vue"

const store = useUserStore()

const user = computed(() => store.user)
const isVisibleMenu = computed(() => store.isVisibleMenu)
</script>

<template>
  <div class="user-data">
    <div class="user">
      <span>{{ user.nickname }}</span>
      <img :src="user.picture" alt="picture profile" loading="lazy">
    </div>
    <div class="btnMenu" @click="store.setIsVisibleMenu">
      <i class='bx bx-menu' v-if="!store.isVisibleMenu"></i>
      <i class='bx bx-menu-alt-left' v-if="store.isVisibleMenu"></i>
    </div>


    <transition 
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight"
      mode="out-in">
      <Navi v-if="isVisibleMenu"/>
    </transition>


  </div>
</template>

<style scoped>
.animate__animated.animate__fadeInRight {
  --animate-duration: .4s;
}
.animate__animated.animate__fadeOutRight {
  --animate-duration: .4s;
}
.user-data {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
}

.user {
  display: flex;
  align-items: center;
  gap: 12px;
  user-select: none;
}

.user span {
  font-size: 1.2rem;
  color: var(--blue-l);
}
.user img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
}

.user img:active {
  scale: 0.95;
} 

.btnMenu {
  background-color: transparent;
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  font-size: 3.3rem;
  cursor: pointer;
  user-select: none;
}

.btnMenu:hover {
  transition: all ease .4s;
  background-color: var(--dark2);
}

.btnMenu:active {
  scale: 0.9;
}

</style>
