
<template>
  <div>
    <!-- background + victory screen -->
    <WinScreen v-if="winCondition" :message="winCondition" :restartGame="restartGame" />
    <!-- Header + BG -->
    <div v-else class="app bg-[url('/img/geometry2.png')] h-screen w-full ">
      <h1 class="py-4 text-2xl font-normal text-center xl:text-4xl"> Matching Game </h1>
      <!--  ScorePanel-->
      <div class="flex justify-center gap-8 p-4 sm:items-center">
        <ul class="flex gap-1">
          <li v-for="(image, index) in streakCounter" :key="index">
            <img :src="`/img/${image}`" alt="streakValue" />
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
        class="grid grid-cols-4 gap-4 p-4 mx-auto rounded-lg shadow-2xl shadow-slate-700 w-96 h-96 xl:w-[40rem] xl:h-[40rem] xl:p-8 xl:gap-8 opacity-95 bg-gradient-to-b from-teal-300 to-violet-400">
        <Card v-for="(card, index) in cardList" :key="`card-${index}`" :matched="card.matched" :value="card.value"
          :visible="card.visible" :position="card.position" @select-card="flipCard" />
        <!-- when @select-card (emmit) is called then it starts the flipCard function -->
      </div>
    </div>
  </div>
</template>

<script script lang="ts">
//imports
import { defineComponent, ref, watch, computed } from 'vue'
import _ from 'lodash';
import Card from './components/Card.vue';
import WinScreen from './components/WinScreen.vue'

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
interface WinScreen { }

export default defineComponent({
  name: 'App',
  components: {
    Card,
    WinScreen
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
    const finalStreak = ref<number>(0)
    const streakCounter = ref<string[]>(['streak.svg', 'streak.svg', 'streak.svg'])
    const winCondition = computed(() => {
      if (remainingPicks.value === 0) {
        stopTimer()

        return ("You won in " + formattedTime.value + " using " + movesCounter.value + " moves, with a streak of " + finalStreak.value)
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

    let canFlip = true;
    /* ############ Card functions ############ */
    const flipCard = (payload: Payload) => {
      /* check for already matched cards */
      if (cardList.value[payload.position].matched || !canFlip) {
        return;
      }
      cardList.value[payload.position].visible = true

      if (userPick.value[0]) {
        if (
          userPick.value[0].position === payload.position && userPick.value[0].cardValue === payload.cardValue
        ) {
          return
        } else {
          userPick.value[1] = payload
          canFlip = false;
          setTimeout(() => {
            canFlip = true;
          }, 800);
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
          streakCounter.value = ['streak.svg', ...streakCounter.value.slice(0, -1)]
          finalStreak.value++;
        } else {
          setTimeout(() => {
            cardList.value[firstPick.position].visible = false;
            cardList.value[secondPick.position].visible = false;
          }, 800);
          streakCounter.value = [...streakCounter.value.slice(1), 'fail.svg']
          finalStreak.value = 0;
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
      streakCounter.value = ['streak.svg', 'streak.svg', 'streak.svg']
    }
    /*Game start */
    startTimer()
    /*    restartGame() */
    restartGame()

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