<script setup>

import { computed, ref, defineProps, defineEmits, watch } from 'vue'
import moment from 'moment'
import Timer from './Timer.vue'

const props = defineProps(['match', 'players'])
const emit = defineEmits(['done'])

const players = props.players?.sort()

const timer = ref(null)

const pitch = ref([])
const bench = ref(players.map(p => ({ name: p, selected: false })))
const select = props.match.format.players === players.length
const startingLineup = ref(props.players.map(p => ({ name: p, selected: select })))

const events = ref([])
const done = ref(false)

const startTime = ref(null)

watch(() => props.match, (newValue, oldValue) => {
    events.value = []
    done.value = false
    timer.value.reset()
})

const hasEnoughPlayersInLineup = computed(() => {
    return startingLineup.value.filter(p => p.selected).length == props.match.format.players
})

const selectedBenchPlayers = computed(() => {
    return bench.value.filter(p => p.selected)
})

const selectedPitchPlayers = computed(() => {
    return pitch.value.filter(p => p.selected)
})

const matchReport = computed(() => {
    return props.players.map(p => {
        const playerEvents = events.value.filter(e => e.player == p)
        return playerEvents.reduce((acc, curr) => {
            const lastOnPitchTime = curr.direction == 'in' ? curr.time : acc.lastOnPitchTime
            const time = curr.direction == 'out' ? curr.time - lastOnPitchTime : 0
            return {
                ...acc,
                totalTime: acc.totalTime + time,
                lastOnPitchTime
            }
        }, { player: p, totalTime: 0 })
    }).sort((a, b) => b.totalTime - a.totalTime)
})

const start = () => {    
    bench.value = startingLineup.value.filter(p => !p.selected).map(p => ({ name: p.name, selected: false }))
    pitch.value = startingLineup.value.filter(p => p.selected).map(p => ({ name: p.name, selected: false }))

    events.value.push(...pitch.value.map(p => ({ type: 'substitution', direction: 'in', player: p.name, time: 0, formattedTime: '00:00' })))

    startTime.value = new Date()
    timer.value.start()
}

const timerDone = () => {
    done.value = true
    events.value.push(...pitch.value.map(p => ({ type: 'substitution', direction: 'out', player: p.name, time: props.match.duration * 1000 })))
    emit('done')
}

const stop = () => {
    timer.value.stop()
}

const selectBenchPlayer = (player) => {
    player.selected = !player.selected
}

const selectPitchPlayer = (player) => {
    player.selected = !player.selected
}

const selectLineupPlayer = (player) => {
    player.selected = !player.selected
}

const formatTime = (time) => {
    return moment.unix(Math.round(time / 1000)).format('mm:ss')
}

const substitute = () => {
    const inset = bench.value.filter(p => p.selected)
    const outset = pitch.value.filter(p => p.selected)

    const newBench = bench.value.filter(p => !p.selected).concat(outset)
    const newPitch = pitch.value.filter(p => !p.selected).concat(inset)

    bench.value = newBench
    pitch.value = newPitch

    const time = timer.value.time()

    events.value.push(...inset.map(p => ({ type: 'substitution', direction: 'in', player: p.name, time })))
    events.value.push(...outset.map(p => ({ type: 'substitution', direction: 'out', player: p.name, time })))

    inset.forEach((p) => p.selected = false)
    outset.forEach((p) => p.selected = false)
}

</script>

<template>
    <h4 style="text-align: center">Feld {{ match.field }} | Match {{ match.teams.reduce((acc, curr) => acc + " - " + curr)
    }} | {{ match.format.name }}</h4>
    <div v-if="!startTime && !done">
        <h1 style="text-align:center">Startaufstellung</h1>
        <div style="margin-top: 1.5rem; display: flex; align-items: flex-start; flex-wrap: wrap" class="player-grid">
            <div class="player-pill clickable" v-for="(player, index) in startingLineup" :key="index" :class="{ selected: player.selected }"
                @click="selectLineupPlayer(player)">{{ player.name }}</div>
        </div>
        <div>
            <button
                style="position:fixed; bottom: 0%; margin-bottom: 2rem; width: calc(100vw - 4rem); font-size: 1.5rem; margin-top: 2rem"
                class="primary clickable" @click="start()" :disabled="!hasEnoughPlayersInLineup">&#x25B6;</button>
        </div>
    </div>
    <div v-show="startTime && !done">
        <Timer ref="timer" :duration="props.match.duration" @done="timerDone"></Timer>
        <div style="margin-top: 1.5rem; display: flex; align-items: flex-start;">
            <ul style="width: 50%; display: inline-block; flex: 1">
                <li v-for="(player, index) in bench" @click="selectBenchPlayer(player)" :key="index" class="clickable" :class="{ selected: player.selected }">
                    {{ player.name }} <span v-if="player.selected">&#129146;</span></li>
            </ul>
            <ul style="display: inline-block; flex: 1" class="pitch">
                <li v-for="(player, index) in pitch" @click="selectPitchPlayer(player)" :key="index" class="clickable" :class="{ selected: player.selected }">
                    {{ player.name }} <span v-if="player.selected">&#129144;</span></li>
            </ul>
        </div>
        <div>
            <button
                style="position:fixed; bottom: 0%; margin-bottom: 2rem; width: calc(100vw - 4rem); font-size: 1.5rem; margin-top: 2rem"
                class="primary clickable" @click="substitute()"
                :disabled="selectedBenchPlayers.length !== selectedPitchPlayers.length || selectedPitchPlayers.length === 0">&#11138;</button>
        </div>
    </div>
    <div v-if="done">
        <h1 style="text-align:center">Match beendet</h1>
        <div class="stats-container">
            <div v-for="(player, index) in matchReport" :key="index" class="stats-row-container">
                <div class="stats-row">
                    <div style="display:inline-block; flex:1; text-align: left">{{ player.player }}</div>
                    <div style="display:inline-block; flex:1; text-align: right">{{ formatTime(player.totalTime) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
ul {
    list-style: none;
    padding-left: 0px;
}

li {
    background: rgba(0, 132, 189, 0.3);
    padding: 0.5rem;
    margin: 1rem;
    border-radius: 5px;
    text-align: center;
    text-transform: uppercase;
}

div.player-grid::after {
    content: "";
    flex: auto;
}

div.player-pill {
    background: rgba(0, 132, 189, 0.3);
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 5px;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
    display: inline-block;
    cursor: pointer;
}

div.player-pill.selected {
    background: rgba(0, 132, 189, 1);
}

li.selected {
    background: rgba(0, 132, 189, 1)
}

ul.pitch li {
    background: hsla(160, 100%, 37%, 1);
}

ul.pitch li.selected {
    background: hsla(160, 100%, 37%, 0.3);
}

.stats-container {
    background-color: rgba(0, 132, 189, 0.3);
    border-radius: 5px;
}

.stats-row-container {
    
}

.stats-row {
    display: flex;
    padding: 0.5rem;
    margin: 0.5rem;
}
</style>