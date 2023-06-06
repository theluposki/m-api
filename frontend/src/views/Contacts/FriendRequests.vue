<script setup>
import { ref, onMounted } from "vue";
import {
  getFriendRequest,
  confirmFriendRequest,
} from "../../repositories/profiles.js";
const friendsRequests = ref([]);
import { useUserStore } from '../../stores/user.js'

const { signOut } = useUserStore()

onMounted(async () => {
  await loadGetFriendRequests()
});

const loadGetFriendRequests = async () => {
  const response = await getFriendRequest()

  if(response === 401) {
    console.log(response)
    return signOut()
  }

  friendsRequests.value = await getFriendRequest();
}

const confirmRequest = async (nickname, requestId, item) => {
  const response = await confirmFriendRequest(nickname, requestId);

  if(response === 401) {
    console.log(response)
    return signOut()
  }

  item.success = true
  setTimeout(async () => {
    return await loadGetFriendRequests()
  }, 1000);
};
</script>
<template>
  <div class="page">
    <header class="header">
      <div class="left">
        <span>Pedidos de amizades</span>
      </div>
      <div class="right">
        <button class="btn-muted">
          <i class="bx bx-user-pin"></i>
        </button>
      </div>
    </header>

    <ul class="list">
      <li v-for="item in friendsRequests" :key="item.id" class="list-item">
        <div class="left">
          <img :src="item.picture" alt="image profile" />
          <span>{{ item.nickname }}</span>
        </div>
        <div class="right">
          <button
            v-if="!item.success"
            class="btn-muted"
            @click="confirmRequest(item.nickname, item.id, item)"
          >
            <i class="bx bx-user-plus"></i>
          </button>
          <button v-if="item.success">
            <i class="bx bx-user-check"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.header {
  width: calc(100% - 68px);
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 12px;
}

button {
  min-width: 40px;
  min-height: 40px;

  border: solid 1px var(--dark);
  background-color: var(--blue-l);
  color: var(--dark);
  padding: 0;

  border-radius: 50%;
  font-weight: 700;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
}

.btn-muted {
  background-color: var(--dark2);
  border: solid 1px #555;
  color: #555;
}

.btn-muted:hover,
.btn-success:hover {
  transition: all ease 0.4s;
  border: solid 1px var(--blue-l);
  color: var(--blue-l);
}

.btn-success {
  background-color: var(--dark2);
  border: solid 1px #555;
  color: var(--white);
}

button:hover {
  transition: all ease 0.2s;
  opacity: 0.95;
}
button:active {
  scale: 0.96;
}

.list {
  width: 100%;
  min-height: calc(100vh - 136px);
  max-height: calc(100vh - 136px);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 12px;

  display: flex;
  flex-direction: column;
  gap: 2px;
}
.list-item {
  background-color: var(--dark);
  min-height: 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 0 4px;
  border-radius: 10px;
}

.list-item img {
  max-width: 50px;
  max-height: 50px;
  object-fit: cover;

  border-radius: 10px;
  box-shadow: 0 0 2px #555;
  cursor: pointer;
}

.list-item .nickname {
  font-weight: bold;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.right {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
}
</style>
