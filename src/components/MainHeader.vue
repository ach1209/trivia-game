<template>
  <header class="main-header">
    <h1 class="main-header-title">Trivia Game</h1>
    <p class="main-header-info">Try to answer all 10 trivia questions correctly!</p>
  </header>
</template>

<style scoped>
.main-header {
  height: 15rem;
  line-height: 4.5rem;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.main-header-title {
  color: var(--white);
  font-size: 4rem;
  font-weight: 700;
}

.main-header-info {
  color: var(--white);
}
</style>