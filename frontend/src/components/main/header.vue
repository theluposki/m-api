<script setup>
import { computed } from "vue";

import Logo from "../header/Logo.vue"
import BtnsLogin from "../header/btnsLogin.vue"
import UserData from "../header/UserData.vue"

import Login from "../login/login.vue"
import Logup from"../login/logup.vue"

import { useUserStore } from '../../stores/user.js'

const store = useUserStore()

const user = computed(() => store.user)

const isVisibleLogin = computed(() => store.isVisibleLogin)
const isVisibleLogup = computed(() => store.isVisibleLogup)

</script>

<template>
  <header class="header">
    <Logo />

    <BtnsLogin v-if="!user.nickname" />
    <UserData v-if="user.nickname"/>

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
</style>
