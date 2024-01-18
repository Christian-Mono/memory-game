<template>
    <button class="relative w-32 h-32" @click="selectCard">
        <!-- front of the card -->

        <div v-if="visible" class="relative h-full rounded-lg absolutew-full bg-cyan-500 is-visible">
            <img class="absolute w-1/2 mx-8 my-8 h-1/2" :src="`/img/${value}.svg`" :alt="value">
            <!-- if matches -->
            <div v-if="matched" class="absolute top-0 left-0 right-0 w-full h-full bg-green-300 rounded-lg "> <img
                    class="w-1/2 mx-8 my-8 h-1/2 " :src="`/img/${value}.svg`" :alt="value">
            </div>
        </div>
        <!-- back of the card -->
        <div v-else class="w-full h-full bg-gray-800 rounded-lg is-hidden">

        </div>
    </button>
</template>

<script script lang="ts">
export default {
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

}
</script>

<style></style>