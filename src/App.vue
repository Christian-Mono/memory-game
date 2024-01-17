<template>
  <h1 class="py-4 text-4xl font-normal text-center"> Matching Game </h1>
  <ScorePannel/>
  <section class="game-board">
    <!-- <Card v-for="(card, index) in cardList" :key="`card-${index}`" :value="card"></Card> -->
    <Card v-for="(card, index) in cardList" :key="`card-${index}`" :value="card.value" :visible="card.visible"
      :position="card.position" @select-card="flipCard" />
    <!-- when @select-card (emmit) is called then it starts the flipCard function -->

  </section>
</template>

<script script lang="ts">
/* imports */
import ScorePannel from './components/ScorePannel.vue';
import Card from './components/Card.vue';
import { ref } from 'vue'
import type ScorePannelVue from './components/ScorePannel.vue';
/* app export */
export default {
  name: 'App',
  components: {
    Card,
    ScorePannel
},
  setup() {
    /* inside setup vanilla JS */
    const cardList = ref([])

    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        value: i,
        visible: false,
        position: i
      })
    }

    const flipCard = (payload) => {
      cardList.value[payload.position].visible = true
    }

    return {
      cardList,
      flipCard
    }
  }
}
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