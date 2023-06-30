<script setup>
import { ref } from 'vue'
import { useTournamentStore } from '../stores/tournament'
import { useRouter } from 'vue-router'

const store = useTournamentStore()
const router = useRouter()

</script>

<template>
  <ul>
    <li v-for="(tournament, index) in store.allTournaments" @click="selectTournament(tournament)">{{ tournament.title }}</li>
  </ul>
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
</style>