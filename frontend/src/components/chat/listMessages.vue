<script setup>
import { ref, computed, onMounted } from "vue";
import { formatDistanceToNow } from "date-fns/esm";
import { ptBR } from "date-fns/esm/locale";
import { useUserStore } from "../../stores/user.js";
import { useChatStore } from "../../stores/chat";
import { encryptValue, decryptValue } from "../../crypto/index.js"

const storeUser = useUserStore();
const storeChat = useChatStore();

const user = computed(() => storeUser.user);
const friend = computed(() => storeChat.currentChat);

const messages = ref([]);

async function getMessagesLocal() {
  const local = `${user.value.nickname}-${friend.value.nickname}`;

  if (localStorage.getItem(local)) {
    return messages.value = JSON.parse(decryptValue(localStorage.getItem(local)));
  }
  return [];
}

function saveMessagesLocal(data) {
  const local = `${user.value.nickname}-${friend.value.nickname}`;
  messages.value.push(data);
  localStorage.setItem(local, encryptValue(JSON.stringify(messages.value)));
}

storeUser.socket.on("messageReceived", async (data) => {
  const messageContainer = document.getElementById("messageContainer");
  saveMessagesLocal(data);

  if (
    messageContainer.scrollTop + messageContainer.clientHeight + 1 <
    messageContainer.scrollHeight
  ) {
    return;
  }
  setTimeout(() => scrollToBottom(), 100);
});

function scrollToBottom() {
  const messageContainer = document.getElementById("messageContainer");
  if (messageContainer) {
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
  }
}

onMounted(async () => {
  await getMessagesLocal()
  scrollToBottom()
});

function formatRelativeDate(date) {
  const now = new Date(date);
  console.log(date)
  const relativeDate = formatDistanceToNow(now, { locale: ptBR });
  return relativeDate;
}

const veryMessage = (sender) => {
  if (sender === user.value.nickname) {
    return "me";
  } else {
    return "friend";
  }
};
</script>

<template>
  <ul class="list" id="messageContainer">
    <li
      v-for="item in messages"
      :key="item.id"
      :class="'list-item ' + veryMessage(item.sender)"
    >
      <span class="sender">{{ item.sender }}</span>
      <p class="message">{{ item.message }}</p>
      <!-- <span class="data">{{ formatRelativeDate(item.createdAt) }}</span> -->
    </li>
  </ul>
</template>

<style scoped>
.list {
  width: 100%;
  min-height: calc(100vh - 194px);
  max-height: calc(100vh - 194px);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 12px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  background-color: #212121;
  filter: drop-shadow(2px 2px 1px #555);
}
.list-item {
  background-color: var(--dark);
  width: calc(fit-content + 20px);
  max-width: 70%;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 12px;

  padding: 4px 12px;
  border-radius: 10px;
  user-select: none;
  box-shadow: 0 1px 2px #555;
}

.list-item .sender {
  font-size: 1.2rem;
  color: var(--blue-l);
}

.list-item .message {
  font-size: 1.6rem;
}

.list-item .data {
  font-size: 1rem;
  align-self: flex-end;
  font-style: italic;
  color: #555;
}

.me {
  align-self: flex-end;
  background-color: var(--dark2);
}

.friend {
  align-self: flex-start;
  background-color: var(--dark);
}
</style>
