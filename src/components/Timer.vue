<script setup>
import { computed, ref, defineProps, defineEmits, watch } from 'vue'
import moment from 'moment'

const props = defineProps(['duration'])
const emit = defineEmits(['done'])

const startTime = ref(null)
const duration = ref('00:00')

const start = () => {
    startTime.value = new Date()
    timer = setInterval(() => refresh(), 1000)
}

let timer = null

const refresh = () => {
    duration.value = moment().subtract(startTime.value).format('mm:ss')
    if (new Date() - startTime.value > props.duration * 1000) {
        stop()
        emit('done')
    }
}

const stop = () => {
    clearInterval(timer)
    startTime.value = null
}

const reset = () => {
    startTime.value = null
    duration.value = '00:00'
}

const time = () => new Date() - startTime.value

defineExpose({
  start,
  stop,
  reset,
  time
})

</script>

<template>
<div class="timer">{{ duration }}</div>  
</template>

<style scoped>
.timer {
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
}
</style>