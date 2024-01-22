<template>
    <!-- Cards -->
    <button class="container w-full h-full rounded-lg shadow-sm shadow-slate-700" @click="selectCard">
        <!-- front of the card -->

        <div v-if="visible" class="relative inset-0 w-full h-full rounded-lg bg-cyan-500 is-visible">
            <img class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-2/4"
                :src="`/img/${value}.svg`" :alt="value">
            <!-- if matches -->
            <div v-if="matched"
                class="relative top-0 left-0 right-0 w-full h-full bg-green-300 rounded-lg animate-[matched_1s]">
                <img class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-2/4"
                    :src="`/img/${value}.svg`" :alt="value">
            </div>
        </div>
        <!-- back of the card -->
        <div v-else class="w-full h-full bg-gray-800 rounded-lg is-hidden">

        </div>
    </button>
</template>

<script script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Card',
    props: {
        matched: {
            type: Boolean,
            default: false
        },
        cardIndex: {
            type: Number,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {
        const selectCard = () => {
            context.emit('select-card', {
                /* payload */
                cardIndex: props.cardIndex,
                cardValue: props.value
            })
        }
        return { selectCard }
    }

})
</script>

<style></style>