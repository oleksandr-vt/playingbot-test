<script setup>
import { onMounted } from 'vue';

const MIN_PAGE = 1
const MAX_PAGE = 10

const router = useRouter()
const route = useRoute()

const DIRECTIONS = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}

const parseIndex = (route) => {
    if(!route) return 0
    if(route[0] === '/') return +route.slice(1)
    return +route
}

const currentIndex = parseIndex(route.params.id)
const prevIndex = parseIndex(router.options.history.state.back)

const forceIndex = (index) => router.replace(`/${index}`)
const pushIndex = (index) => router.push(`/${index}`)

const direction = ref(prevIndex > currentIndex ? DIRECTIONS.LEFT : DIRECTIONS.RIGHT)
const enterOffset = computed(() => direction.value === DIRECTIONS.LEFT ? '-100%' : '100%')
const leaveOffset = computed(() => direction.value === DIRECTIONS.RIGHT ? '-100%' : '100%')

if (isNaN(currentIndex)) forceIndex(MIN_PAGE)
if (currentIndex < MIN_PAGE) pushIndex(MIN_PAGE)
if (currentIndex > MAX_PAGE) pushIndex(MAX_PAGE)

const canGoLeft = currentIndex > MIN_PAGE
const canGoRight = currentIndex < MAX_PAGE

const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1))
const randomColor = () => {
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    return `rgb(${r},${g},${b})`
}

const onPrev = () => {
    direction.value = DIRECTIONS.LEFT
    randomColor()
    pushIndex(currentIndex - 1)
}

const onNext = () => {
    direction.value = DIRECTIONS.RIGHT
    randomColor()
    pushIndex(currentIndex + 1)
}

const progress = `${(currentIndex - 1) * 50}px`
</script>

<template>
    <div class="wrapper">
        <h2>Page {{ currentIndex }} / 10</h2>

        <div class="progress">
            <div class="progress-gauge"></div>
        </div>

        <div class="btns">
            <button :disabled="!canGoLeft" @click="onPrev">
                Previous
            </button>
        
            <button :disabled="!canGoRight" @click="onNext">
                Next
            </button>
        </div>
    </div>
</template>

<style>
.wrapper {
    width: 100%;
    min-height: 100vh;
    background-color: v-bind(randomColor());
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 20px;
}

.progress {
    width: 100%;
    max-width: 450px;
    height: 14px;
    border-radius: 20px;
    background-color: #f2f2f2;
    border: 1px solid #000000;
}

.progress-gauge {
    width: 100%;
    max-width: v-bind(progress);
    height: 100%;
    border-radius: 20px;
    background-color: #663299;
}

.btns {
    margin-top: 20px;
    display: flex;
    gap: 15px;
}

.btns button {
    padding: 5px;
    cursor: pointer;
}

.page-enter-active,
.page-leave-active {
    transition: 0.4s all ease;
}

.page-enter-from {
    transform: translateX(v-bind(enterOffset));
}
.page-leave-to {
    transform: translateX(v-bind(leaveOffset));
}
</style>