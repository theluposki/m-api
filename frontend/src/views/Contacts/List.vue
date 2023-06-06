<script setup>
import { ref, onMounted } from 'vue'
import { getMyFriends } from '../../repositories/profiles.js'
import { useUserStore } from '../../stores/user.js'

const { signOut } = useUserStore()


const friends = ref([])
const search = ref("")

onMounted(async () => {
  await getMyFriend()
})

const searchRegex = async () => {
  if(search.value === "") return await getMyFriend()

  const reg = new RegExp(search.value, 'ig')
  const result = friends.value.filter(item => item.nickname.match(reg))

  return friends.value = result
}

const getMyFriend = async () => {
  const response = await getMyFriends()

  if(response === 401) {
    console.log(response)
    return signOut()
  }

  friends.value = response
}



</script>
<template>
  <div class="page">
    <header class="header">
      <input type="text" @keyup="searchRegex" v-model="search" class="input" placeholder="procurar amigo">
      <button @click="searchRegex">
        <i class='bx bx-search'></i>
      </button>
    </header>

    <ul class="list">
      <li v-for="item in friends" :key="item.id" class="list-item">
        <div class="left">
        <img :src="item.picture" alt="image profile" loading="lazy">
        <span class="nickname">{{ item.nickname }}</span>
      </div>

      <div class="right">

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
  justify-content: center;
  gap: 12px;
  padding: 0 12px;
}

.input {
  width: 100%;
  min-height: 40px;
  background-color: transparent;
  border: solid 1px transparent;
  border-bottom: solid 1px var(--blue-l);
  color: var(--white);
  caret-color: var(--blue-l);
  font-size: 1.6rem;
  outline: none;
}

.input::placeholder {
  color: #555;
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
