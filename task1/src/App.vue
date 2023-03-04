<script setup>
import { onMounted, ref } from 'vue';
import { initAnimation } from './composables/initAnimation.js'
import PlusIcon from './components/icons/PlusIcon.vue';
import MinusIcon from './components/icons/MinusIcon.vue';
import AnimationIcon from './components/icons/AnimationIcon.vue';

const score = ref(0)

const iconDOM = ref(null)
const scoreDOM = ref(null)
const titleDOM = ref(null)
const cardDOM = ref(null)

const animation = ref(null)
const isAnimating = ref(false)

const animationDuration = 1.2

const textTheme = {
    default: { color: '#FFFFFF' },
    active: { color: '#8DF6D0' },
}

const cardTheme = {
    default: { backgroundColor: '#111129' },
    active: { backgroundColor: '#1D1D36' },
}

onMounted(() => {
    animation.value = initAnimation({
        icon: iconDOM.value,
        score: scoreDOM.value,
        title: titleDOM.value,
        card: cardDOM.value,
        animationDuration,
        textTheme,
        cardTheme,
        onUpdate,
        onComplete,
    })
})

const onUpdate = () => {
    score.value++
}
const onComplete = () => {
    isAnimating.value = false
}

const increase = () => {
    isAnimating.value = true
    animation.value.play()
}
</script>

<template>
    <div class="wrapper">
        <div class="card" ref="cardDOM">
            <div class="score">
                <span ref="scoreDOM">{{ score }}</span>

                <div class="animation" ref="iconDOM">
                    <AnimationIcon />
                </div>
            </div>

            <p class="title" ref="titleDOM">Goals</p>

            <div class="btns">
                <button class="btn btn-minus">
                    <MinusIcon />
                </button>
    
                <button class="btn btn-plus" :disabled="isAnimating" @click="increase()">
                    <PlusIcon />
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    max-width: 100%;
    min-height: 100vh;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #131343;
}

.card {
    width: 100%;
    max-width: 327px;
    background: v-bind("cardTheme.default.backgroundColor");
    border: 1px solid v-bind("cardTheme.active.backgroundColor");
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 16px;
}

.score {
    position: relative;
    min-width: 55px;
    min-height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: v-bind("cardTheme.active.backgroundColor");
    overflow: hidden;
}

.score span {
    font-weight: 700;
    font-size: 28px;
    line-height: 30px;
}

.animation {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    height: 100%;
    background: v-bind("textTheme.active.color");
    display: flex;
    align-items: center;
    justify-content: center;
}

.title {
    text-transform: uppercase;
    font-weight: 700;
}

.btns {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 20px;
    margin-left: auto;
}

.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: v-bind("cardTheme.active.backgroundColor");
    border-radius: 12px;
    border: none;
    outline: none;
    cursor: pointer;
}

.btn.btn-plus {
    background: #2D2DD7;
}
</style>
