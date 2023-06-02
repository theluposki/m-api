<script setup>
import { computed } from "vue";
import { useChatStore } from "../stores/chat.js";
import HeaderContacts from "../components/chat/header.vue";

const store = useChatStore();

const isVisibleMenuChat = computed(() => store.isVisibleMenuChat);
</script>

<template>
  <div class="page">
    <transition
      enter-active-class="animate__animated animate__slideInRight"
      leave-active-class="animate__animated animate__slideOutRight"
      mode="out-in"
    >
      <HeaderContacts v-if="isVisibleMenuChat" />
    </transition>

    <div class="btnHeader" @click="store.setIsVisibleMenuChat">
      <i class="bx bx-dots-vertical-rounded" v-if="!isVisibleMenuChat"></i>
      <i class="bx bx-x" v-if="isVisibleMenuChat"></i>
    </div>

    <router-view v-slot="{ Component }">
      <transition
        enter-active-class="animate__animated animate__slideInRight"
        leave-active-class="animate__animated animate__slideOutRight"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.animate__animated.animate__slideInRight {
  --animate-duration: 0.1s;
}
.animate__animated.animate__slideOutRight {
  --animate-duration: 0.1s;
}

.btnHeader {
  position: absolute;
  top: 0;
  right: 0;

  margin: 4px;
  background-color: var(--dark2);
  box-shadow: 0 0 13px var(--dark);
  border: solid 1px #555;
  width: 50px;
  min-height: 50px;
  z-index: 9000;
  cursor: pointer;

  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--blue-l);
  font-size: 26px;
}

.btnHeader:hover {
  box-shadow: 0 0 1px var(--blue-l);
}
.btnHeader:active {
  scale: 0.9;
}
</style>
