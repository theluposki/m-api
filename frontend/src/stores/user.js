import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue';
import { signInRepo } from '../repositories/user.js'
import { encryptValue, decryptValue } from '../crypto/index.js'

export const useUserStore = defineStore('user', () => {
  const user = ref({})
  const isVisibleLogin = ref(false);
  const isVisibleLogup = ref(false);

  const isVisibleMenu = ref(false);

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
    }
  })

  async function signIn(email, password) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const response = await signInRepo(email,password)

    if(response.error) return response

    user.value = response.user
    localStorage.setItem("user-connected", encryptValue(JSON.stringify(response.user)))
    setIsVisibleLogin()
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
  }
})
