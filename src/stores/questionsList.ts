import { ref } from 'vue'
import { defineStore } from 'pinia'

interface QuestionDetails {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

export const useQuestionStore = defineStore('questionList', () => {
  const questionList = ref<QuestionDetails[]>([])
  const hasQuizStarted = ref(false)

  async function loadGame() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    const results = await response.json()
    hasQuizStarted.value = true

    questionList.value = results.results
  }

  const currentQuestionIndex = ref(0)

  return { questionList, hasQuizStarted, loadGame, currentQuestionIndex }
})