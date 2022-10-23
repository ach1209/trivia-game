<script setup lang="ts">
import { computed } from 'vue'

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
</script>

<template>
  <div class="question-content">
    <header class="content-header">
      <span>Question {{ props.currentQuestionIndex + 1 }} of {{ props.totalCount }}</span>
    </header>
    <form>
      <h2 v-html="props.question" class="question mg-bottom-2"></h2>
      <div v-for="choice in choices" :key="choice" class="answer-wrapper">
        <input type="radio" name="choice" id="answer-choice">
        <label for="answer-choice" v-html="choice" class="mg-left-2"></label>
      </div>
      <footer class="content-footer">
        <slot />
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
}

.answer-wrapper:not(:last-child) {
  margin-bottom: 0.5rem;
}

.answer-wrapper:last-of-type {
  margin-bottom: 2rem;
}
</style>