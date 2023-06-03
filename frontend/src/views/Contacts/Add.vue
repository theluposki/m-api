<script setup>

</script>
<template>
  <div class="page">
   <header class="header">
    <input type="text" class="input" placeholder="procurar amigo">
    <button>
      <i class='bx bx-search'></i>
    </button>
   </header>

   <ul class="list">
    <li class="list-item">
      <img src="https://i.pravatar.cc/150?img=38" alt="image profile" loading="lazy">
      <span class="nickname">Monique</span>
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
}
.list-item {
  background-color: var(--dark);
  min-height: 60px;
  display: flex;
  align-items: center;
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
}

.list-item img:hover {
  transition: all ease .8s;
  max-width: 250px;
  max-height: 250px;
  cursor: pointer;
}

.list-item .nickname {
  font-weight: bold;
}


</style>
