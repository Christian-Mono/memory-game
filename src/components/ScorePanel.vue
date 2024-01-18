<template>
  <div class="flex items-center justify-center gap-8 py-2">
    <ul class="flex gap-1">
      <li>#</li>
      <li>#</li>
      <li>#</li>
    </ul>
    <p>TimeElapsed: {{ formattedTime }}</p>
    <p> No.Moves: {{ movesCounter }} </p>
    <button @click="restartGame">
      <img src="../../public/img/restart.svg" alt="restart-icon">
    </button>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, inject, watch, computed, onUnmounted } from 'vue'

export default defineComponent({
  name: 'ScorePanel',
  props: ['restartGame'],
  setup(props) {
    const movesCounter = inject<number>('movesCounter')
    const timeElapsed = ref<number>(0)
    let intervalId: number | undefined

    const startTimer = () => {
      intervalId = setInterval(() => {
        timeElapsed.value++
      }, 1000)
    }

    const stopTimer = () => {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = undefined
      }
    }
    watch(() => movesCounter.value, (newVal, oldVal) => {
      if (newVal !== oldVal && newVal > 0) {
        if (intervalId) {
          stopTimer()
        }
        startTimer()
      }
    }, { deep: true })

    const formattedTime = computed(() => {
      const hours = Math.floor(timeElapsed.value / 3600)
      const minutes = Math.floor((timeElapsed.value % 3600) / 60)
      const seconds = timeElapsed.value % 60
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    })

    return {
      movesCounter,
      formattedTime,
    }
  }
})
</script>
  
<style scoped>

</style>
  