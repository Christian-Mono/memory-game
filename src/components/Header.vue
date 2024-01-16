<!-- Board.vue -->
<script setup lang="ts">
import ScorePannel from './ScorePannel.vue';
import CardList from './CardList.vue'

</script>

<template>
    <div class="container p-6 bg-pink-300 board">
        <h1 class="py-4 text-4xl font-normal text-center">Matching Game</h1>
        <ScorePannel></ScorePannel>
        <CardList></CardList>

    </div>
</template>

<style scoped></style>
