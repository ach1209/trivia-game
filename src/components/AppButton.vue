<script setup lang="ts">
interface ButtonProps {
  btnText: string
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'md'
})
</script>

<template>
  <button class="btn" :class="`btn-${props.size}`">{{ props.btnText }}</button>
</template>

<style scoped>
button {
  font-family: var(--secondaryFont);
  font-size: 1.65rem;
  letter-spacing: 0.5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 0 2px 3px rgba(var(--dark-rgb), 0.1),
              0 2px 4px rgba(var(--dark-rgb), 0.2);
}

.btn {
  color: var(--white);
  background-color: var(--secondary);
}

.btn-sm {
  padding: 0.75rem 2.5rem;
}

.btn-md {
  padding: 1.25rem 1.5rem;
}

.btn-disabled {
  color: var(--dark);
  background-color: var(--light);
  box-shadow: none;
}

@media screen and (min-width: 990px) {
  .btn {
    transition: box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .btn:hover,
  .btn:focus {
    box-shadow: inset 0 0 0 100% var(--dark);
  }
}
</style>