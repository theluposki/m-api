<template>
  <footer class="footer">
    <div class="users-conected">
      <i class='bx bxs-user'></i> 
      <span>0</span>
    </div>
    <span class="copy">&copy; 2023 MyReb. Todos os direitos reservados.</span>
  </footer>
</template>

<style scoped>
.footer {
  min-height: 14px;
  max-height: 14px;
  background-color: var(--dark);
  color: var(--blue-l);

  padding: 0 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.users-conected {
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.copy {
  font-size: 0.8rem;
}
</style>
