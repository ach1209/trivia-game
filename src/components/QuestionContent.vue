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
  <span>Question {{ props.currentQuestionIndex + 1 }} of {{ props.totalCount }}</span>
  <form>
    <p v-html="props.question"></p>
    <div v-for="choice in choices" :key="choice">
      <input type="radio" name="choice" id="answer-choice">
      <label for="answer-choice" v-html="choice"></label>
    </div>
    <slot />
  </form>
</template>