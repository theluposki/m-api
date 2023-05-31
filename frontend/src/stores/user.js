import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue';

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

  const userMock = {
    id: "2792e9b0-aec1-4f62-88ff-1d1bfcdd49d2",
    nickname: "Jon Doe",
    picture: "https://randomuser.me/api/portraits/men/31.jpg",
    bio: "",
    links: [],
    created_at: "2023-05-19T12:34:01.000Z",
    updated_at: "2023-05-19T12:34:01.000Z",
  }

  onMounted(() => {
    if(localStorage.getItem("user-connected")) {
      user.value = JSON.parse(localStorage.getItem("user-connected"))
    }
  })

  async function signIn(email, password) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(email, password)
    user.value = userMock
    localStorage.setItem("user-connected", JSON.stringify(userMock))
    setIsVisibleLogin()
    return "autenticado com sucesso!"
  }

  async function signUp(name, email, password) {
    console.log(name, email, password)
    setIsVisibleLogup()
  }
  
  async function signOut() {
    user.value = {}
    localStorage.removeItem("user-connected")
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
