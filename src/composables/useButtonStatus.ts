import { ref } from 'vue'

export function useButtonStatus() {
  const enableSubmit = ref(true)
  const enableNext = ref(false)

  function switchButtonStatus() {
    enableSubmit.value = !enableSubmit.value
    enableNext.value = !enableSubmit.value
  }

  return { enableSubmit, enableNext, switchButtonStatus }
}