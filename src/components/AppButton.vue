<script setup lang="ts">
const props = defineProps<{
  btnText: string
}>()
</script>

<template>
  <button class="btn">{{ props.btnText }}</button>
</template>

<style scoped>
button {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;  
}

.btn {
  padding: 1.25rem 1.5rem;
  color: var(--light);
  background-color: var(--secondary);
}
</style>