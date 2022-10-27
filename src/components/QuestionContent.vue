<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCounter } from '@vueuse/core'
import { useQuestionStore } from '@/stores/questionsList'
import { useButtonStatus } from '../composables/useButtonStatus'

import '@fontsource/inter'
import AppButton from '@/components/AppButton.vue'
import ModalMessage from '@/components/ModalMessage.vue'

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

const remainingAttempts = ref(3)
const { count, inc } = useCounter()

function checkAnswer(chosenAnswer: string) {
  if (props.correctAnswer === chosenAnswer) {
    revealCorrectAnswer()
    inc()
  } else {
    revealCorrectAnswer()
    remainingAttempts.value--
  }
}

watch(remainingAttempts, () => {
  if (remainingAttempts.value === 0) {
    showModal.value = !showModal.value
  }
})

const { enableSubmit, enableNext, switchButtonStatus } = useButtonStatus()
const answerStatus = ref('')
const disableInput = ref(false)
const qStore = useQuestionStore()

function getNextQuestion() {
  if (qStore.currentQuestionIndex < props.totalCount && remainingAttempts.value !== 0) {
    qStore.currentQuestionIndex++

    // reset back to default state
    answerStatus.value = ''
    disableInput.value = false
    selectedAnswer.value = ''
    switchButtonStatus()
  }
}

function revealCorrectAnswer() {
  answerStatus.value = 'This is the correct answer'
  disableInput.value = true
  switchButtonStatus()
}

const showModal = ref(false)

function reset() {
  answerStatus.value = ''
  disableInput.value = false
  selectedAnswer.value = ''
  remainingAttempts.value = 3
  switchButtonStatus()
  qStore.currentQuestionIndex = 0
  qStore.hasQuizStarted = false
  showModal.value = !showModal.value
}
</script>

<template>
  <div class="question-content">
    <header class="content-header">
      <span class="question-count">Question {{ props.currentQuestionIndex + 1 }} of {{ props.totalCount }}</span>
      <span class="counter">Remaining Attempts: {{ remainingAttempts }}</span>
    </header>
    
    <form @submit.prevent="checkAnswer(selectedAnswer)">
      <h2 v-html="props.question" class="question mg-bottom-2"></h2>
      <div v-for="choice in choices" :key="choice" class="answer-wrapper">
        <input type="radio" name="choice" id="answer-choice" :value="choice" v-model="selectedAnswer" :disabled="disableInput">
        <label for="answer-choice" v-html="choice" class="mg-left-2"></label>
        <span class="answer-status" v-if="choice === props.correctAnswer">{{ answerStatus }}</span>
      </div>
      <footer class="content-footer">
        <AppButton btn-text="Submit" size="sm" v-if="enableSubmit" :class="{ 'btn-disabled': isSubmitDisabled }" :disabled="isSubmitDisabled" />
        <AppButton @click.prevent="getNextQuestion" btn-text="Next" size="sm" v-if="enableNext" />
      </footer>
    </form>
  </div>

  <ModalMessage :remaining-attempts="remainingAttempts" :correct-answers-count="count" v-if="showModal">
    <AppButton btnText="Play Again" @click.prevent="reset" />
  </ModalMessage>
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