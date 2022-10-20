<script setup lang="ts">
import "@fontsource/poppins"
import MainHeader from '@/components/MainHeader.vue'
import AppButton from '@/components/AppButton.vue'

import { useQuestionStore } from '@/stores/questionsList'

const qStore = useQuestionStore()
</script>

<template>
  <MainHeader />
  <AppButton @click.prevent="qStore.fetchQuestions" btnText="Start Game" />
</template>

<style scoped>

</style>
