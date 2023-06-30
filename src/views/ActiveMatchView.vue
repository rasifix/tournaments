<script setup>
import { computed, ref } from 'vue';
import Match from '../components/Match.vue';
import { useTournamentStore } from '../stores/tournament';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const store = useTournamentStore()

if (!store.active) {
    router.push('/tournaments/setup')
}

let showNext = ref(false)

const active = computed(() => {
    const index = route.params.index
    return store.active.matches[index]
})

const done = () => {
    console.log('done')
    showNext.value = true
}

const nextMatch = () => {
    showNext = false
    store.nextMatch()
    router.push('/tournaments/active')
}

</script>

<template>
    <Match v-if="active" :match="active"
        :players="store.active.players" @done="done()" />

    <div v-if="showNext">
        <button style="position:fixed; bottom: 0%; margin-bottom: 2rem; width: calc(100vw - 4rem); margin-top: 2rem"
            class="primary clickable" @click="nextMatch()">N&auml;chster Match</button>
    </div>
</template>