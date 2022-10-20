import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Response {
  response_code: number
  results: {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
  }[]
}

export const useQuestionStore = defineStore('questionList', () => {
  const questionList = ref<Response | undefined>()
  const hasQuizStarted = ref(false)

  async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    const results = await response.json()
    hasQuizStarted.value = true

    return questionList.value = results
  }

  const currentQuestionIndex = ref(0)
  function getNextQuestion() {
    if (questionList.value != undefined && currentQuestionIndex.value < questionList.value.results.length) {
      currentQuestionIndex.value++
    }
  }

  return { questionList, hasQuizStarted, fetchQuestions, currentQuestionIndex, getNextQuestion }
})