import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useChatStore = defineStore('chat', () => {
  const currentChat = ref({})
  const isVisibleMenuChat = ref(false);

  const setCurrentChat = (friend) => {
    currentChat.value = friend
  }

  const removeCurrentChat = (friend) => {
    currentChat.value = {}
  }

  const setIsVisibleMenuChat = () => {
    if (isVisibleMenuChat.value) {
      isVisibleMenuChat.value = false
    } else {
      isVisibleMenuChat.value = true
    }
  }

  return {
    currentChat,
    setCurrentChat,
    isVisibleMenuChat, 
    setIsVisibleMenuChat,
    removeCurrentChat
  }
})
