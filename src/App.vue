
<template>
  <h1 class="py-4 text-4xl font-normal text-center"> Matching Game </h1>
  <ScorePannel :moves="movesCounter" />
  <h2>{{ status }} - {{ movesCounter }} </h2>
  <section class="game-board">
    <!-- <Card v-for="(card, index) in cardList" :key="`card-${index}`" :value="card"></Card> -->
    <Card v-for="(card, index) in cardList" :key="`card-${index}`" :matched="card.matched" :value="card.value"
      :visible="card.visible" :position="card.position" @select-card="flipCard" />
    <!-- when @select-card (emmit) is called then it starts the flipCard function -->
  </section>
  <button @click="restartGame">Restart game</button>
</template>

<script script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import _ from 'lodash';
import ScorePannel from './components/ScorePannel.vue';
import Card from './components/Card.vue';


interface Card {
  value: number;
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
    ScorePannel
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
      shuffleCards()

      cardList.value = cardList.value.map((card, index) => {
        return {
          ...card,
          matched: false,
          position: index,
          visible: false,
        }
      })
    }

    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        value: i,
        visible: false,
        position: i,
        matched: false
      })
    }

    const flipCard = (payload: Payload) => {
      cardList.value[payload.position].visible = true

      if (userPick.value[0]) {
        userPick.value[1] = payload
      } else {
        userPick.value[0] = payload
      }
    }
    watch(userPick, currentValue => {
      if (currentValue.length === 2) {
        const firstPick = currentValue[0];
        const secondPick = currentValue[1];

        if (firstPick.cardValue === secondPick.cardValue) {
          status.value = 'Matched';

          cardList.value[firstPick.position].matched = true;
          cardList.value[secondPick.position].matched = true;
        } else {
          status.value = 'Mismatch';

          cardList.value[firstPick.position].visible = false;
          cardList.value[secondPick.position].visible = false;
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
<style>
.game-board {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: 100px 100px 100px 100px;
  gap: 2rem;
  justify-content: center;
}
</style>