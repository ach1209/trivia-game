<template>
  <header class="main-header">
    <h1 class="main-header-title">Trivia Game</h1>
    <p class="main-header-info">Try to answer all 10 trivia questions correctly!</p>
  </header>
</template>

<style scoped lang="scss">
.main-header {
  height: 15rem;
  background-color: var(--primary);
  @include flex(center, center, column);

  @include device-max(480px) {
    padding: 0 3rem;
    text-align: center;
  }
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