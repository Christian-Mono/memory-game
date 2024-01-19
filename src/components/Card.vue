<template>
    <button class="container relative lg:-32 lg:h-32 sm:w-18 sm:h-18 " @click="selectCard">
        <!-- front of the card -->

        <div v-if="visible" class="relative rounded-lg lg:h-full bg-cyan-500 is-visible">
            <img class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-2/4" :src="`/img/${value}.svg`" :alt="value">
            <!-- if matches -->
            <div v-if="matched" class="absolute top-0 left-0 right-0 bg-green-300 rounded-lg lg:h-full ">
                <img class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-2/4" :src="`/img/${value}.svg`" :alt="value">
            </div>
        </div>
        <!-- back of the card -->
        <div v-else class="bg-gray-800 rounded-lg lg:h-full lg:w-full is-hidden">

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
        position: {
            type: Number,
            required: true
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
                position: props.position,
                cardValue: props.value
            })
        }
        return { selectCard }
    }

})
</script>

<style></style>