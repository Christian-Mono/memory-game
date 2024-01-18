
<template>
  <div class="app bg-[url('../public/img/geometry2.png')] container">
    <h1 class="py-4 text-4xl font-normal text-center"> Matching Game </h1>
    <div class="flex items-center justify-center gap-8 py-2">
      <ul class="flex gap-1">
        <li>#</li>
        <li>#</li>
        <li>#</li>
      </ul>
      <p>Time</p>
      <p> No.Moves: {{ movesCounter }} </p>
      <button @click="restartGame">
        <img src="../public/img/restart.svg" alt="restart-icon">
      </button>
    </div>
    <!--<h2>{{ status }}</h2> TRIGGERS when i win, i will use to change page -->
    <section class="grid w-3/6 grid-cols-4 gap-6 p-10 mx-auto rounded-lg bg-gradient-to-br from-teal-300 to-violet-400 ">
      <Card v-for="(card, index) in cardList" :key="`card-${index}`" :matched="card.matched" :value="card.value"
        :visible="card.visible" :position="card.position" @select-card="flipCard" />
      <!-- when @select-card (emmit) is called then it starts the flipCard function -->
    </section>

  </div>
</template>

<script script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import _ from 'lodash';
import Card from './components/Card.vue';


interface Card {
  value: string;
  visible: boolean;
  position: any;
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
  }, setup() {
    const cardList = ref<Card[]>([]) //type card and all his values
    const userPick = ref<Payload[]>([])
    const movesCounter = ref<number>(0)
    const status = computed(() => {
      //win condition
      if (remainingPicks.value === 0) {
        return "You won"
      }
      return ""; // Aggiungi un valore di ritorno predefinito
    })

    const remainingPicks = computed(() => {
      const remainingCards = cardList.value.filter(
        card => card.matched === false).length

      return remainingCards / 2
    })

    const shuffleCards = () => {
      cardList.value = _.shuffle(cardList.value);
    }

    const restartGame = () => {
      shuffleCards();
      movesCounter.value = 0;

      cardList.value = cardList.value.map((card, index) => {
        return {
          ...card,
          matched: false,
          position: index,
          visible: false,
        }
      })
    }

    const cardItems = ['globe', 'binoculars', 'moon', 'astronaut', 'shuttle', 'antenna', 'satellite', 'meteor'];

    cardItems.forEach(item => {
      cardList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false
      })

      cardList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false
      })

    })

    cardList.value = cardList.value.map((card, index) => {
      return {
        ...card,
        position: index
      }
    })

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
        } else {
          setTimeout(() => {

            cardList.value[firstPick.position].visible = false;
            cardList.value[secondPick.position].visible = false;
          }, 1000);
        }
        movesCounter.value++;
        userPick.value.length = 0
      }
    }, { deep: true })

    return {
      cardList,
      flipCard,
      userPick,
      status,
      movesCounter,
      shuffleCards,
      restartGame
    }
  }
})
</script>
<style></style>