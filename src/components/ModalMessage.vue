<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  remainingAttempts: number
  correctAnswersCount: number
}>()

const modalMsg = computed(() => {
  if (props.remainingAttempts === 0) {
    return 'Sorry! You\'ve ran out of attempts.'
  }
  return 'Congratulations! You\'ve answered all the questions!'
})
</script>

<template>
  <Teleport to="#app">
    <div class="modal">
      <div class="modal-bg"></div> 
      <div class="modal-body">
        <div class="container">
          <div class="modal-content">
            <h2 class="modal-message">{{ modalMsg }}</h2>
            <p>You answered {{ props.correctAnswersCount }} questions correctly.</p>
            <slot />            
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
}

.modal-bg {
  position: absolute;
  top: 0;
  width: inherit;
  height: inherit;
  background-color: rgba(var(--dark-rgb), 0.7);
}

.modal-body {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  transform: translateY(-50%);
  z-index: 50;
  width: 55%;
  margin: 0 auto;
  padding: 3rem;
  background: var(--white);
  border-radius: 5px;
}

.modal-content {
  width: 100%;
  line-height: 7rem;
  text-align: center;
}
</style>