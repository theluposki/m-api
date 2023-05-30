<template>
  <main class="main">
    <h1 class="title">
      <i class='bx bx-git-merge'></i>
      MyReb
    </h1>
    <section class="feature-section">
      <div class="feature">
        <h2>Tecnologia</h2>
        <p>Utilizamos as mais avançadas tecnologias para oferecer uma experiência de chat rápida e eficiente.</p>
      </div>
      <div class="feature">
        <h2>Segurança</h2>
        <p>Priorizamos a segurança dos usuários com medidas de criptografia e proteção de dados.</p>
      </div>
      <div class="feature">
        <h2>Inovação</h2>
        <p>Estamos sempre em busca de inovações para tornar o chat mais interessante e interativo.</p>
      </div>
      <div class="feature">
        <h2>Sem Censura</h2>
        <p>Promovemos a liberdade de expressão, garantindo um ambiente sem censura.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.main {
  min-height: calc(100vh - 74.4px);
  max-height: calc(100vh - 74.4px);
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--dark2);
  color: var(--white);
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
  color: var(--blue-l);
  font-size: 5rem;
}

.feature-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 40px auto;
  padding: 40px;

  /* background-color: red; */
  max-width: 80%;
}

.feature {
  display: flex;
  flex-direction: column;
}

.feature h2 {
  color: var(--blue-l);
}
</style>
