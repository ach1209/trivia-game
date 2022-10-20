<script setup lang="ts">
import "@fontsource/poppins"
import MainHeader from '@/components/MainHeader.vue'

import { useQuestionStore } from '@/stores/questionsList'

const qStore = useQuestionStore()
</script>

<template>
  <MainHeader />
  <button @click.prevent="qStore.fetchQuestions">Fetch Questions</button>
</template>

<style scoped>

</style>
