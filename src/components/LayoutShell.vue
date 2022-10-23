<template>
  <div class="container">
    <div class="layout-shell">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.layout-shell {
  width: 100%;
  height: 60vh;
  background-color: var(--white);
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 0 1px 2px rgba(var(--dark-rgb), 0.1),
              0 1px 3px rgba(var(--dark-rgb), 0.2);
}
</style>