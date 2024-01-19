
<template>
  <!-- Header + background -->
  <div class="app bg-[url('/img/geometry2.png')] container">
    <h1 class="py-4 text-4xl font-normal text-center"> Matching Game </h1>
    <h2 class="text-center">{{ winCondition }}</h2>
    <!--  ScorePanel-->
    <div class="flex items-center justify-center gap-8 py-2">
      <ul class="flex gap-1">
        <li v-for="(image, index) in streakCounter" :key="index">
          <img :src="`../public/img/${image}`" alt="streak" />
        </li>
      </ul>
      <p>{{ formattedTime }}</p>
      <p> No.Moves: {{ movesCounter }} </p>
      <button @click="restartGame">
        <img src="/img/restart.svg" alt="restart-icon">
      </button>
    </div>
    <!-- Deck -->
    <div
      class="container m-auto rounded-lg md:grid lg:grid lg:grid-cols-4 md:grid-cols-1 lg:gap-6 lg:p-10 lg:w-3/6 bg-gradient-to-br from-teal-300 to-violet-400">
      <Card v-for="(card, index) in cardList" :key="`card-${index}`" :matched="card.matched" :value="card.value"
        :visible="card.visible" :position="card.position" @select-card="flipCard" />
      <!-- when @select-card (emmit) is called then it starts the flipCard function -->
    </div>
  </div>
</template>

<script script lang="ts">
//imports
import { defineComponent, ref, watch, computed } from 'vue'
import _ from 'lodash';
import Card from './components/Card.vue';

//interfaces
interface Card {
  value: string;
  visible: boolean;
  position: number;
  matched: boolean;
}
interface Payload {
  cardValue: number;
  position: number;
}

export default defineComponent({
  name: 'App',
  components: {
    Card,
  },
  setup() {
    const cardList = ref<Card[]>([])
    const userPick = ref<Payload[]>([])
    const movesCounter = ref<number>(0)
    const timeElapsed = ref<number>(0)
    let intervalId: number | undefined
    const formattedTime = computed(() => {
      //https://sabe.io/blog/javascript-convert-milliseconds-seconds-minutes-hours#formatting-the-time 
      const seconds = timeElapsed.value % 60
      const minutes = Math.floor((timeElapsed.value % 3600) / 60)
      const hours = Math.floor(timeElapsed.value / 3600)
      return [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0")
      ].join(":");
    })
    const streakCounter = ref<string[]>(['astronaut.svg', 'astronaut.svg', 'astronaut.svg'])
    const winCondition = computed(() => {
      if (remainingPicks.value === 0) {
        stopTimer()
        return ("You won 🫰" + "Tempo impiegato: " + formattedTime.value)
      }
      return "";
    })


    /* ############ Deck Builder ############ */
    const cardItems = ['globe', 'binoculars', 'moon', 'astronaut', 'shuttle', 'antenna', 'satellite', 'meteor'];

    cardItems.forEach((item, index) => {
      cardList.value.push({
        value: item,
        visible: false,
        position: index,
        matched: false
      })

      cardList.value.push({
        value: item,
        visible: false,
        position: index,
        matched: false
      })

    })

    cardList.value = cardList.value.map((card, index) => {
      return {
        ...card,
        position: index
      }
    })

    const remainingPicks = computed(() => {
      const remainingCards = cardList.value.filter(
        card => card.matched === false).length
      return remainingCards / 2
    })

    /* ############ Timer functions ############ */
    const startTimer = () => {
      intervalId = setInterval(() => {
        timeElapsed.value++
      }, 1000)
    }
    startTimer()
    const stopTimer = () => {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = undefined
      } return timeElapsed.value
    }
    const restartTimer = () => {
      clearInterval(intervalId)
      timeElapsed.value = 0
      startTimer()
    }


    /* ############ Card functions ############ */
    const flipCard = (payload: Payload) => {
      cardList.value[payload.position].visible = true

      if (userPick.value[0]) {
        if (
          userPick.value[0].position === payload.position && userPick.value[0].cardValue === payload.cardValue
        ) {
          return
        } else {
          userPick.value[1] = payload
        }
      } else {
        userPick.value[0] = payload
      }
    }

    watch(userPick, currentValue => {
      if (currentValue.length === 2) {
        const firstPick = currentValue[0];
        const secondPick = currentValue[1];

        if (firstPick.cardValue === secondPick.cardValue) {

          cardList.value[firstPick.position].matched = true;
          cardList.value[secondPick.position].matched = true;
          streakCounter.value = ['astronaut.svg', ...streakCounter.value.slice(0, -1)]
        } else {
          setTimeout(() => {
            cardList.value[firstPick.position].visible = false;
            cardList.value[secondPick.position].visible = false;
          }, 800);
          streakCounter.value = ['moon.svg', ...streakCounter.value.slice(0, -1)]
        }
        movesCounter.value++;
        userPick.value.length = 0

      }

    }, { deep: true })

    const shuffleCards = () => {
      cardList.value = _.shuffle(cardList.value);
    }
    const restartGame = () => {
      shuffleCards();
      restartTimer();
      movesCounter.value = 0;
      cardList.value = cardList.value.map((card, index) => {
        return {
          ...card,
          matched: false,
          position: index,
          visible: false,
        }
      })
      streakCounter.value = ['astronaut.svg', 'astronaut.svg', 'astronaut.svg']
    }

    return {
      cardList,
      flipCard,
      userPick,
      winCondition,
      movesCounter,
      shuffleCards,
      restartGame,
      formattedTime,
      streakCounter
    }
  }
})
</script>
<style></style>