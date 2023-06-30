<script setup>
import { useTournamentStore } from '../stores/tournament';
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useTournamentStore()

if (!store.active) {
    router.push('/tournaments/setup')
}

const selectMatch = (index) => {
    router.push('/tournaments/active/' + index)
}

</script>

<template>
  <main>
    <h1>Turnier {{ store.active.category }} - Team {{ store.active.team }}</h1>
    <div style="text-align: center; margin-bottom: 2rem">{{  [...store.active.players].reduce((acc, curr) => acc + ", " + curr) }}</div>
    <ul class="pills">
        <li v-for="(match, index) in store.active.matches" :key="index" class="clickable" :class="{ future: index > store.active.nextMatch, selected: index === store.active.nextMatch }" @click="selectMatch(index)">
            <div class="field-number"><div class="field-number-content">{{ match.field }}</div></div> 
            <div class="field-number" style="flex: 1; border-right: none"><div class="field-number-content">{{ match.teams.reduce((acc, curr) => acc + " - " + curr) }} | {{ match.format.name }}</div></div>
        </li>
    </ul>
  </main>
</template>

<style scoped>
h1 {
    text-align: center;
} 

ul.pills {
    list-style-type: none;
    padding-left: 0px;
}

.field-number {
    width: 40px;
    height: 22px;
    color: white;
    font-size: 1rem;
    height: 40px;
    display: inline-block;
    border-right: 1px solid white;
}

.field-number-content {
    padding: 6px;
    display: inline-block;
}

li {
    padding: 6px;
    background: rgba(0, 132, 189, 0.3);
    margin: 0.5rem;
    border-radius: 5px;
    text-align: center;
}

ul.pills li {
    padding: 0px;
    display: flex;
    cursor: pointer;
}

li.selected {
    background: rgb(0, 132, 189, 1);
}

.future {
    background-color: #666;
}
</style>
