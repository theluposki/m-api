<script setup>
import { computed, onBeforeUnmount, onBeforeMount} from "vue";
import { useChatStore } from "../../stores/chat.js";
import { useRouter } from "vue-router";

const { push } = useRouter();
const store = useChatStore();

const friend = computed(() => store.currentChat)

const back = () => push('/contacts/list')
</script>

<template>
  <header class="header">
    <div class="left">
      <button class="btn-muted" @click="back">
        <i class="bx bx-arrow-back"></i>
      </button>
      <img :src="friend.picture" alt="imagem friend" />
    </div>
    <span>{{ friend.nickname }}</span>
  </header>
</template>

<style scoped>
.header {
  width: calc(100%);
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #555;
  gap: 12px;
  padding: 0 68px 0 12px;
}

.header img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
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
