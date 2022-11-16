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

const state = ref({
  selectedAnswer: '',
  remainingAttempts: 3,
  remainingQuestions: 10,
  answerStatus: '',
  disableInput: false,
  showModal: false
})

const initialState = [{...state}]

const isSubmitDisabled = computed<boolean>(() => {
  if (state.value.selectedAnswer !== '') {
    return false
  }
  return true
})

const { count, inc } = useCounter()

function checkAnswer(chosenAnswer: string) {
  if (props.correctAnswer === chosenAnswer) {
    revealCorrectAnswer()
    inc()
    state.value.remainingQuestions--
  } else {
    revealCorrectAnswer()
    state.value.remainingAttempts--
    state.value.remainingQuestions--
  }
}

watch([() => state.value.remainingAttempts, () => state.value.remainingQuestions], () => {
  if (state.value.remainingAttempts === 0 || state.value.remainingQuestions === 0) {
    state.value.showModal = !state.value.showModal
  }
}, { deep: true })

const { enableSubmit, enableNext, switchButtonStatus } = useButtonStatus()
const qStore = useQuestionStore()

function getNextQuestion() {
  if (qStore.currentQuestionIndex < props.totalCount && state.value.remainingAttempts !== 0) {
    qStore.currentQuestionIndex++

    // reset back to default state
    state.value.answerStatus = ''
    state.value.disableInput = false
    state.value.selectedAnswer = ''
    switchButtonStatus()
  }
}

function revealCorrectAnswer() {
  state.value.answerStatus = 'This is the correct answer'
  state.value.disableInput = true
  switchButtonStatus()
}

function reset() {
  Object.assign(state, initialState)
  switchButtonStatus()
  qStore.currentQuestionIndex = 0
  qStore.hasQuizStarted = false
}
</script>

<template>
  <div class="question-content">
    <header class="content-header">
      <span class="question-count">Question {{ props.currentQuestionIndex + 1 }} of {{ props.totalCount }}</span>
      <span class="counter">Remaining Attempts: {{ state.remainingAttempts }}</span>
    </header>
    
    <form @submit.prevent="checkAnswer(state.selectedAnswer)">
      <h2 v-html="props.question" class="question mg-bottom-2"></h2>
      <div v-for="choice in choices" :key="choice" class="answer-wrapper">
        <input type="radio" name="choice" id="answer-choice" :value="choice" v-model="state.selectedAnswer" :disabled="state.disableInput">
        <label for="answer-choice" v-html="choice" class="mg-left-2"></label>
        <span class="answer-status" v-if="choice === props.correctAnswer">{{ state.answerStatus }}</span>
      </div>
      <footer class="content-footer">
        <AppButton btn-text="Submit" size="sm" v-if="enableSubmit" :class="{ 'btn-disabled': isSubmitDisabled }" :disabled="isSubmitDisabled" />
        <AppButton @click.prevent="getNextQuestion" btn-text="Next" size="sm" v-if="enableNext" />
      </footer>
    </form>
  </div>

  <ModalMessage :remaining-attempts="state.remainingAttempts" :correct-answers-count="count" v-if="state.showModal">
    <AppButton btnText="Play Again" @click.prevent="reset" />
  </ModalMessage>
</template>

<style scoped lang="scss">
.question-content {
  height: 100%;
  font-family: var(--secondaryFont);
  @include flex(null, space-evenly, column);
}

.content-header {
  @include flex(null, space-between);

  @include device-max(430px) {
    flex-direction: column;
  }
}

.question-count {
  font-size: 1.7rem;
  font-weight: 600;
}

.counter {
  font-size: 1.7rem;
}

.content-footer {
  @include flex(null, end);
}

.question {
  font-size: 1.9rem;
  font-weight: 500;
}

.answer-wrapper {
  height: 4rem;
  cursor: pointer;
  background-color: var(--white);
  border-radius: 5px;
  transition: background-color 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);

  @include device-min(568px) {
    @include flex(center);
  }

  @include device-max(567px) {
    height: 5rem;
  }

  @include device-min(431px) {
    padding: 0 2rem;
  }
}

.answer-wrapper:not(:last-child) {
  margin-bottom: 0.5rem;
}

.answer-wrapper:last-of-type {
  margin-bottom: 2rem;
}

.answer-status {
  color: green;

  @include device-min(568px) {
    margin-left: auto;
  }

  @include device-max(567px) {
    display: block;
  }
}

@include device-min(990px) {
  .answer-wrapper:hover {
    background-color: var(--light);
  }
}
</style>