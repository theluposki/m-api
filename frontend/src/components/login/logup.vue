<script setup>
import { ref } from 'vue'
import Loading from '../loading.vue'

const nickname = ref("")
const email = ref("")
const password = ref("")
const confpassword = ref("")
const lock = ref(true)
const message = ref("")

const toggleLock = () => {
  const password = document.getElementById("password")
  const confpassword = document.getElementById("confpassword")

  if(lock.value) {
    lock.value = false
    password.type = "text"
    confpassword.type = "text"
  } else {
    lock.value = true
    password.type = "password"
    confpassword.type = "password"
  }
}

const clear = () => {
  nickname.value = ""
  email.value = ""
  password.value = ""
  confpassword.value = ""
}
</script>

<template>
  <div class="login">

    <div class="wrapper">
      <div class="form-control">
        <label for="nickname">Nome de usuário</label>
        <input tabindex="1" type="text" class="input" v-model="nickname" id="nickname" placeholder="digite o seu nome de usuário" autocomplete="off">
      </div>

      <div class="form-control">
        <label for="email">E-mail</label>
        <input tabindex="2" type="e-mail" class="input" v-model="email" id="email" placeholder="digite seu e-mail" autocomplete="off">
      </div>
      
      <div class="form-control">
        <label for="password">Senha</label>
        <div class="form-group">
          <input tabindex="3" type="password" class="input" v-model="password" id="password" placeholder="digite sua senha">

          <span class="lock" @click="toggleLock">
            <i class='bx bxs-lock' v-if="lock"></i>
            <i class='bx bxs-lock-open' v-else></i>
          </span>
        </div>
      </div>

      <div class="form-control">
        <label for="confpassword">Confirmar senha</label>
        <div class="form-group">
          <input tabindex="4" type="password" class="input" v-model="confpassword" id="confpassword" placeholder="digite novamente a senha">

          <span class="lock" @click="toggleLock">
            <i class='bx bxs-lock' v-if="lock"></i>
            <i class='bx bxs-lock-open' v-else></i>
          </span>
        </div>
      </div>

      <Loading />

      <span class="message" v-if="false">{{ message }}</span>

      <div class="form-buttoms">
        <a href="#" @click.prevent="clear">limpar</a>
        <button tabindex="5">Registrar-se</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.login {
  position: absolute;
  z-index: 30000;
  background-color: var(--dark);
  width: 100%;
  max-width: 1048px;
  height: calc(100vh - 74px);
  overflow-x: hidden;
  overflow-y: auto;
  top: 60px;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.wrapper {
  flex: 1;
  max-width: 365px;

  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-control {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.form-check {
  display: flex;
  align-items: center;
  gap: 4px;
}

.message {
  text-align: center;
  min-height: 20px;
  color: var(--blue-l);
  font-size: 1.2rem;
  font-style: italic;
  margin: 10px 0;
}

.form-check label {
  cursor: pointer;
}
.form-check input[type="checkbox"] {
  accent-color: var(--blue-l);
}

.form-check input[type="checkbox"]:checked:before{
background-color:green;
}

.form-buttoms {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-buttoms a {
  text-decoration: none;
  color: var(--blue-l);
  font-size: 1.2rem;
}

.form-buttoms a:hover {
  transition: scale ease-in .2s,
  opacity ease-in .4s;
  scale: 0.98;
  opacity: .7;
}

label {
  font-size: 1.2rem;
  color: var(--blue-l);
}

.input {
  width: 100%;
  min-height: 40px;
  background-color: transparent;
  border: solid 1px transparent;
  border-bottom: solid 1px var(--blue-l);
  color: var(--white);
  caret-color: var(--blue-l);
  outline: none;
  font-size: 1.6rem;
}

.input::placeholder {
  color: #555;
}

.lock {
  min-width: 45px;
  min-height: 45px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 24px;
  color: var(--blue-l);
  cursor: pointer;
  /* background-color: red; */
}

.lock:active {
  scale: 0.9;
}

button {
  border: solid 1px var(--dark);
  background-color: var(--blue-l);
  color: var(--dark);
  padding: 8px 16px;

  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
}

button:hover {
  transition: all ease .2s;
  opacity: 0.95;
}
button:active {
  scale: 0.96;
}

</style>
