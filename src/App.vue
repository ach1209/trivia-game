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
      <AppButton @click.prevent="qStore.loadGame" btn-text="Start Game" />
    </div>
    <QuestionContent
      v-else
      :current-question-index="qStore.currentQuestionIndex"
      :total-count="qStore.questionList.length"
      :question="qStore.questionList[qStore.currentQuestionIndex].question"
      :correct-answer="qStore.questionList[qStore.currentQuestionIndex].correct_answer"
      :incorrect-answers="qStore.questionList[qStore.currentQuestionIndex].incorrect_answers"
    >
      <AppButton @click.prevent="qStore.getNextQuestion" btn-text="Next" />
    </QuestionContent>
  </LayoutShell>
</template>