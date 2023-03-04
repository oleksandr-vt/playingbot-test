<script setup>
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

const onPrev = () => {
    direction.value = DIRECTIONS.LEFT
    pushIndex(currentIndex - 1)
}

const onNext = () => {
    direction.value = DIRECTIONS.RIGHT
    pushIndex(currentIndex + 1)
}
</script>

<template>
    <div class="wrapper">
        {{ currentIndex }}

        <button :disabled="!canGoLeft" @click="onPrev">
            Previous
        </button>
    
        <button :disabled="!canGoRight" @click="onNext">
            Next
        </button>
    </div>
</template>

<style>
.wrapper {
    background: red;
    border: 10px solid blue;
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