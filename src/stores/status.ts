import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useQuestionStore } from './questionsList'

export const useStatusStore = defineStore('status', () => {
  const enableSubmit = ref(true)
  const enableNext = ref(false)

  function switchButtonStatus() {
    enableSubmit.value = !enableSubmit.value
    enableNext.value = !enableSubmit.value
  }  

  const qStore = useQuestionStore()
  const remainingAttempts = ref(3)

  function checkAnswer(chosenAnswer: string) {
    if (qStore.questionList[qStore.currentQuestionIndex].correct_answer === chosenAnswer) {
      revealCorrectAnswer()
    } else {
      revealCorrectAnswer()
      remainingAttempts.value--
    }
  }

  const answerStatus = ref('')
  const disableInput = ref(false)

  function getNextQuestion() {
    if (qStore.currentQuestionIndex < qStore.questionList.length && remainingAttempts.value !== 0) {
      qStore.currentQuestionIndex++

      // reset back to default state
      answerStatus.value = ''
      disableInput.value = false
      switchButtonStatus()
    }
  }

  function revealCorrectAnswer() {
    answerStatus.value = 'This is the correct answer'
    disableInput.value = true
    switchButtonStatus()
  }

  return { enableSubmit, enableNext, remainingAttempts, checkAnswer, answerStatus, disableInput, getNextQuestion }
})