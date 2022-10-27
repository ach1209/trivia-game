<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStatusStore } from '@/stores/status'

import '@fontsource/inter'
import AppButton from '@/components/AppButton.vue'

const props = defineProps<{
  currentQuestionIndex: number
  totalCount: number
  question: string
  correctAnswer: string
  incorrectAnswers: string[]
}>()

const choices = computed<string[]>(() => {
  return [...props.incorrectAnswers, props.correctAnswer].sort()
})

const selectedAnswer = ref('')

const isSubmitDisabled = computed<boolean>(() => {
  if (selectedAnswer.value !== '') {
    return false
  }
  return true
})

const status = useStatusStore()
</script>

<template>
  <div class="question-content">
    <header class="content-header">
      <span class="question-count">Question {{ props.currentQuestionIndex + 1 }} of {{ props.totalCount }}</span>
      <span class="counter">Remaining Attempts: {{ status.remainingAttempts }}</span>
    </header>
    
    <form @submit.prevent="status.checkAnswer(selectedAnswer)">
      <h2 v-html="props.question" class="question mg-bottom-2"></h2>
      <div v-for="choice in choices" :key="choice" class="answer-wrapper">
        <input type="radio" name="choice" id="answer-choice" :value="choice" v-model="selectedAnswer" :disabled="status.disableInput">
        <label for="answer-choice" v-html="choice" class="mg-left-2"></label>
        <span class="answer-status" v-if="choice === props.correctAnswer">{{ status.answerStatus }}</span>
      </div>
      <footer class="content-footer">
        <AppButton btn-text="Submit" size="sm" v-if="status.enableSubmit" :class="{ 'btn-disabled': isSubmitDisabled }" :disabled="isSubmitDisabled" />
        <AppButton @click.prevent="status.getNextQuestion" btn-text="Next" size="sm" v-if="status.enableNext" />
      </footer>
    </form>
  </div>
</template>

<style scoped>
.question-content {
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  font-family: var(--secondaryFont);
}

.content-header {
  display: flex;
  justify-content: space-between;
}

.question-count {
  font-size: 1.7rem;
  font-weight: 600;
}

.counter {
  font-size: 1.7rem;
}

.content-footer {
  display: flex;
  justify-content: end;
}

.question {
  font-size: 1.9rem;
  font-weight: 500;
}

.answer-wrapper {
  height: 4rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: var(--white);
  border-radius: 5px;
  transition: background-color 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.answer-wrapper:not(:last-child) {
  margin-bottom: 0.5rem;
}

.answer-wrapper:last-of-type {
  margin-bottom: 2rem;
}

@media screen and (min-width: 990px) {
  .answer-wrapper:hover {
    background-color: var(--light);
  }
}

.answer-status {
  color: green;
  margin-left: auto;
}
</style>