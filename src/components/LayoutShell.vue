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
  background-color: #fff;
  border-radius: 5px;
  padding: 2rem;
}
</style>