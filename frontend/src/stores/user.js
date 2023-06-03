import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue';
import { signInRepo } from '../repositories/user.js'
import { encryptValue, decryptValue } from '../crypto/index.js'
import { io } from 'socket.io-client';
import config from '../config/index.js';

export const useUserStore = defineStore('user', () => {
  const user = ref({})
  const isVisibleLogin = ref(false);
  const isVisibleLogup = ref(false);
  const userCountUpdate = ref(0)

  const isVisibleMenu = ref(false);

  console.log(config.BASE_URL_SOCKET)

  const socket = io(config.BASE_URL_SOCKET, {
    transports: ['websocket']
  })

  socket.on("userCountUpdate", (data) => {
    userCountUpdate.value = data
  })

  const setIsVisibleLogin = () => {
    if (isVisibleLogin.value) {
      isVisibleLogin.value = false
      isVisibleLogup.value = false
    } else {
      isVisibleLogin.value = true
      isVisibleLogup.value = false
    }
  }

  const setIsVisibleLogup = () => {
    if (isVisibleLogup.value) {
      isVisibleLogup.value = false
      isVisibleLogin.value = false
    } else {
      isVisibleLogup.value = true
      isVisibleLogin.value = false
    }
  }

  const setIsVisibleMenu = () => {
    if (isVisibleMenu.value) {
      isVisibleMenu.value = false
    } else {
      isVisibleMenu.value = true
    }
  }

  onMounted(() => {
    if(localStorage.getItem("user-connected")) {
      user.value = JSON.parse(decryptValue(localStorage.getItem("user-connected")))
      socket.emit("login", user.value.nickname)
    }
  })

  async function signIn(email, password) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const response = await signInRepo(email,password)

    if(response.error) return response

    user.value = response.user
    localStorage.setItem("user-connected", encryptValue(JSON.stringify(response.user)))
    setIsVisibleLogin()
    socket.emit("login", user.value.nickname)
    return response.user
  }

  async function signUp(name, email, password) {
    console.log(name, email, password)
    setIsVisibleLogup()
  }
  
  async function signOut() {
    user.value = {}
    localStorage.removeItem("user-connected");
  }
  
  return { 
    user, 
    signIn, 
    signUp, 
    signOut, 
    isVisibleLogin, 
    isVisibleLogup,
    setIsVisibleLogin,
    setIsVisibleLogup,
    isVisibleMenu,
    setIsVisibleMenu,
    userCountUpdate 
  }
})
