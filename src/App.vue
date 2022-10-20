<script setup lang="ts">
import "@fontsource/poppins"
import MainHeader from '@/components/MainHeader.vue'
import AppButton from '@/components/AppButton.vue'
import LayoutShell from '@/components/LayoutShell.vue'
import QuestionContent from '@/components/QuestionContent.vue'

import { useQuestionStore } from '@/stores/questionsList'

const qStore = useQuestionStore()
</script>

<template>
  <MainHeader />
  <LayoutShell class="mg-top-4">
    <div v-if="!qStore.hasQuizStarted" class="flex-centered-element">
      <AppButton @click.prevent="qStore.fetchQuestions" btn-text="Start Game" />
    </div>
    <QuestionContent
      v-else
      :current-question-index="qStore.currentQuestionIndex"
      :total-count="qStore.questionList?.results.length"
      :question="qStore.questionList?.results[qStore.currentQuestionIndex].question"
      :correct-answer="qStore.questionList?.results[qStore.currentQuestionIndex].correct_answer"
      :incorrect-answers="qStore.questionList?.results[qStore.currentQuestionIndex].incorrect_answers"
    >
      <AppButton @click.prevent="qStore.getNextQuestion" btn-text="Next" />
    </QuestionContent>
  </LayoutShell>
</template>