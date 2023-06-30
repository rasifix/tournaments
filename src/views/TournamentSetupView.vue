<script setup>
import { ref } from 'vue';
import { usePlayerStore } from '../stores/player'
import { useTournamentStore } from '../stores/tournament';
import { useRouter } from 'vue-router'

const step = ref(0)
const tournament = ref(null)
const team = ref(null)

const router = useRouter()

const store = usePlayerStore()
const tournamentStore = useTournamentStore()

const players = ref(new Set())

const playerSelected = (player) => {
    if (players.value.has(player.title)) {
        players.value.delete(player.title)
    } else {
        players.value.add(player.title)
    }
}

const letsGo = () => {
    tournamentStore.startTournament(tournament.value, team.value, [ ...players.value ])
    router.push('/tournaments/active')
}

</script>

<template>
    <div v-if="step === 0">
        <h1>Turnier ausw&auml;hlen</h1>
        <ul>
            <li v-for="(t) in tournamentStore.allTournaments" @click="step = 1; tournament = t" style="display:flex">
                <span style="flex: 1">{{ t.title }}</span>
                <span>&#x276F;</span>
            </li>
        </ul>        
    </div>
    <div v-if="step === 1">
        <h1>Spieler ausw&auml;hlen</h1>
        <ul>
            <li v-for="(player, index) in store.players" class="player-pill" @click="playerSelected(player)" :class="{ selected: players.has(player.title)}">
                {{ player.title }}
            </li>
        </ul>
        <div style="display: flex; margin-top: 1rem">
            <span style="flex: 1"></span>
            <button class="primary" @click="step = 2" :disabled="players.size < tournament.players.min || players.size > tournament.players.max">Next</button>
        </div>
    </div>
    <div v-if="step === 2">
        <h1>Team ausw&auml;hlen</h1>
        <ul>
            <li v-for="(t) in tournament.teams" @click="step = 3; team = t" style="display:flex">
                <span style="flex: 1">{{ t }}</span>
                <span>&#x276F;</span>
            </li>
        </ul>
    </div>
    <div v-if="step === 3">
        <h1>Zusammenfassung</h1>
        <div>{{ tournament.title }} | Team {{ team }}</div>
        <div>{{ [...players].reduce((acc, curr) => acc + ", " + curr) }}</div>
        <table style="width: 100%">
            <thead>
                <th>Feld</th>
                <th>Format</th>
                <th>Match</th>
            </thead>
            <tbody>
                <tr v-for="match in tournament.matches.filter(m => m.teams.find(t => t === team))">
                    <td>{{ tournament.fields[match.field].name }}</td>
                    <td>{{ tournament.fields[match.field].format }}</td>
                    <td>{{ match.teams.reduce((acc, curr) => acc + " - " + curr) }}</td>
                </tr>
            </tbody>
        </table>
        <button class="primary" style="margin-top: 1rem; width: 100%" @click="letsGo()">Los geht es!</button>
    </div>
</template>

<style scoped>
ul {
    list-style-type: none;
    padding-left: 0px;
}
li {
    padding: 6px;
    border-bottom: 1px solid #ccc;
    font-size: 1.2rem;
}
li:last-child {
    border-bottom: none
}
table {
    margin-top: 1rem;
}
th {
    font-weight: bold;
}
td {
    text-align: center;
}

.player-pill {
    background: rgba(0, 132, 189, 0.3);
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 5px;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
    display: inline-block;
    border-bottom: none;
    font-size: 1rem;
}

.player-pill.selected {
    background: rgba(0, 132, 189, 1);
}
</style>