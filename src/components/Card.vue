<template>
    <div class="card" @click="selectCard">
        <!-- front of the card -->
        <div v-if="visible" class="card-face is-visible">
            {{ value }} - {{ matched }}
        </div>
        <!-- back of the card -->
        <div v-else class="card-face is-hidden">
            Back
        </div>
    </div>
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
            type: Number,
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

<style>
.card {
    position: relative;
    border: 5px solid #ccc;
    text-align: center;

}

.card-face {
    width: 100%;
    height: 100%;
    position: absolute;
}

.card-face.is-visible {
    background-color: red;
    color: white;
}

.card-face.is-hidden {
    background-color: blue;
    color: black;
}
</style>