import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

interface Response {
  response_code: number
  results: Results[]
}

interface Results {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

export const useQuestionStore = defineStore('questionList', () => {
  const questionList: Ref<Response[]> = ref([])
  const hasQuizStarted = ref(false)

  async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    const results = await response.json()
    hasQuizStarted.value = true

    return questionList.value = results
  }

  return { questionList, hasQuizStarted, fetchQuestions }
})