<script setup>
import { ref, computed, onMounted} from 'vue'
import { useUserStore } from '../../stores/user';
import { useChatStore } from '../../stores/chat';

const storeUser = useUserStore()
const storeChat = useChatStore()

const input = ref("")
const user = computed(() => storeUser.user)
const friend = computed(() => storeChat.currentChat)

const sendMessage = () => {
  const data = {
    id: window.crypto.randomUUID(),
    sender: user.value.nickname,
    receiver: friend.value.nickname,
    message: input.value,
    createdAt: Date.now(),
  }
  console.log("data: ", data.receiver)
  storeUser.socket.emit("sendMessage", data)
  input.value = ""
}
</script>

<template>
  <footer class="footer">
    <div class="left">
      <button class="btn-muted">
        <i class='bx bxs-grid' ></i>
      </button>
      <button class="btn-muted">
        <i class='bx bx-wink-smile'></i>
      </button>
    </div>

    <div class="right">
      <textarea v-model="input" @keyup.enter="sendMessage" placeholder="Mensagem"></textarea>
      <button @click="sendMessage">
        <i class='bx bx-send' ></i>
      </button>
    </div>

  </footer>
</template>

<style scoped>
.input, textarea {
  width: 100%;
  min-height: 40px;
  background-color: transparent;
  border: solid 1px transparent;
  border-bottom: solid 1px var(--blue-l);
  color: var(--white);
  caret-color: var(--blue-l);
  font-size: 1.6rem;
  outline: none;
  resize: none;
}

.input::placeholder, textarea::placeholder {
  color: #555;
}

button {
  min-width: 40px;
  min-height: 40px;

  border: solid 1px var(--dark);
  background-color: var(--blue-l);
  color: var(--dark);
  padding: 0px;

  border-radius: 50%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.9rem;
}

.btn-muted {
  background-color: var(--dark2);
  border: solid 1px #555;
  color: #555;
}

.btn-muted:hover, .btn-success:hover {
  transition: all ease .4s;
  border: solid 1px var(--blue-l);
  color: var(--blue-l);
}

.btn-success {
  background-color: var(--dark2);
  border: solid 1px #555;
  color: var(--white);
}

button:hover {
  transition: all ease .2s;
  opacity: 0.95;
}
button:active {
  scale: 0.96;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.right {
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
}

.footer {
  width: calc(100%);
  min-height: 60px;
  max-height: 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: solid 1px #555;
  gap: 12px;
  padding: 0 12px;
}
</style>
