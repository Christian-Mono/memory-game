<template>
    <div class="bg-[url('/img/geometry2.png')] container text-center h-screen">
        <img src="/img/trophy.svg" alt="Winner" class="flex p-8 m-auto h-1/3">
        <h1 class="p-8 text-5xl font-normal">You are a winner!</h1>
        <p class="p-8 text-2xl">{{ message }}</p>
        <button @click="restartGame" class="p-2 text-2xl bg-green-300 rounded-lg "> Play another game!</button>
        <!-- Altri elementi della schermata di vittoria qui -->
    </div>
</template>
  
<script script lang="ts">
export default {
    props: ['message', 'restartGame']
}
</script>
