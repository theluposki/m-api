<script setup>
import { computed } from "vue";
import { useChatStore } from "../../stores/chat.js";
import { useRouter } from "vue-router";

const { push, currentRoute } = useRouter();

const pathname = computed(() => currentRoute.value.fullPath);
const store = useChatStore();

const setLink = (link) => {
  push(link);
  store.setIsVisibleMenuChat();
};
</script>

<template>
  <header class="header">
    <div
      class="nav-link"
      :class="pathname === '/contacts/chat' ? 'nav-link active' : 'nav-link'"
      @click="setLink('/contacts/chat')"
    >
      <i class="bx bx-chat"></i>
    </div>
    <div
      class="nav-link"
      :class="pathname === '/contacts/list' ? 'nav-link active' : 'nav-link'"
      @click="setLink('/contacts/list')"
    >
      <i class="bx bx-list-ul"></i>
    </div>
    <div
      class="nav-link"
      :class="pathname === '/contacts/add' ? 'nav-link active' : 'nav-link'"
      @click="setLink('/contacts/add')"
    >
      <i class="bx bx-list-plus"></i>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: absolute;
  top: 0;
  right: 58px;

  margin: 4px;
  background-color: var(--dark2);
  border: solid 1px #555;
  box-shadow: 0 0 13px var(--dark);
  width: calc(100% - 68px);
  min-height: 50px;
  z-index: 9000;

  border-radius: 4px;

  display: flex;
  align-items: center;
  padding: 0 4px;
  gap: 4px;
}

.nav-link {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px #555;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 0 13px var(--dark);
  background-color: var(--dark);
}

.nav-link:hover {
  box-shadow: 0 0 2px var(--blue-l);
}
.nav-link:active {
  scale: 0.9;
}

.active {
  background-color: var(--blue-l);
  color: var(--dark);
}
</style>
