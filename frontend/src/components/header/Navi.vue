<script setup>
import { computed } from "vue";
import { useUserStore } from '../../stores/user.js'
import { useRouter } from 'vue-router'

const store = useUserStore()

const { push, currentRoute} = useRouter()

const pathname = computed(() => currentRoute.value.fullPath)

const user = computed(() => store.user)

const setLink = (link) => {
  push(link)
  store.setIsVisibleMenu()
}

const signOut = () => {
  store.signOut()
  store.setIsVisibleMenu()
}

</script>

<template>
  <nav class="nav">

    <div 
      :class="pathname === '/' ? 'nav-link active' : 'nav-link' " 
      @click="setLink('/')"
      >
      <i class='bx bx-home-alt' ></i>
      <span>Início</span>
    </div>

    <div 
      :class="pathname === '/contacts' ? 'nav-link active' : 'nav-link' "
      @click="setLink('/contacts/list')"
      >
      <i class='bx bxs-contact' ></i>
      <span>Contatos</span>
    </div>

    <div 
      :class="pathname === '/about' ? 'nav-link active' : 'nav-link' "
      @click="setLink('/about')"
      >
      <i class='bx bx-info-square'></i>
      <span>Sobre</span>
    </div>

    <div class="opt">
      <div class="btnLogout" @click="signOut">
        <span>Sair</span>
        <i class='bx bxs-log-out' ></i>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: absolute;
  top: 60px;
  right: 0;

  min-width: 325px;
  min-height: calc(100vh - 84px);
  background-color: var(--dark2);
  box-shadow: 0 0 13px var(--dark);

  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border-radius: 4px;
  z-index: 10000;
}

.nav-link {
  width: 100%;
  min-height: 45px;
  background-color: var(--dark);

  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 12px;
  border-radius: 4px;
  box-shadow: 0 0 1px var(--dark2);
  cursor: pointer;
  user-select: none;
}

.nav-link:hover {
  transition: all ease .2s;
  box-shadow: 0 0 1px var(--blue-l);
  transform: translateX(1px);
  color: var(--blue-l);
}

.active {
  background-color: var(--blue-l);
  color: var(--dark);
}

.active:hover {
  transition: all ease .2s;
  box-shadow: 0 0 1px var(--blue-l);
  transform: translateX(1px);
  color: var(--dark);
}

.opt {
  background-color: var(--dark2);
  box-shadow: 0 0 6px var(--dark);
  position: absolute;
  bottom: 0;
  left: 0;

  min-width: 325px;
  min-height: 50px;
  border-radius: 0 0 4px 4px;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 12px;
}

.btnLogout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  color: #555;
}

.btnLogout:hover {
  transition: all ease .4s;
  color: var(--white);
}

.btnLogout:active {
  scale: 0.95;
  color: #555;
}

.btnLogout span {
  font-size: 1.4rem;
}
.btnLogout i {
  font-size: 2.6rem;
}

</style>
