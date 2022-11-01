<script setup lang="ts">
import '@fontsource/poppins'
import MainHeader from '@/components/MainHeader.vue'
import AppButton from '@/components/AppButton.vue'
import LayoutShell from '@/components/LayoutShell.vue'
import QuestionContent from '@/components/QuestionContent.vue'
import MainFooter from '@/components/MainFooter.vue'

import { useQuestionStore } from '@/stores/questionsList'

const qStore = useQuestionStore()
</script>

<template>
  <MainHeader />
  <LayoutShell class="pd-lr-2">
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
    </QuestionContent>
  </LayoutShell>
  <MainFooter />
</template>