<script setup>
import { computed, onBeforeUnmount, onBeforeMount} from "vue";
import { useChatStore } from "../../stores/chat.js";
import { useRouter } from "vue-router";

import ListMessages from "../../components/chat/listMessages.vue"
import HeaderChat from "../../components/chat/header.vue"
import FooterChat from "../../components/chat/footer.vue"

const { push } = useRouter();
const store = useChatStore();

const friend = computed(() => store.currentChat)

onBeforeMount(() => {
  if(!store.currentChat.nickname) {
    back()
  }
})

onBeforeUnmount(() => {
  setTimeout(() => store.removeCurrentChat(), 100)
})

const back = () => push('/contacts/list')
</script>
<template>
  <div class="page">
    <HeaderChat v-if="friend.nickname"/>
    <ListMessages v-if="friend.nickname"/> 
    <FooterChat v-if="friend.nickname"/>
  </div>
</template>

<style scoped>

</style>
