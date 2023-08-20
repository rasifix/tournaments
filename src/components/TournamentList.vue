<script setup>
import { ref } from 'vue'
import { useTournamentStore } from '../stores/tournament'
import { useRouter } from 'vue-router'

const store = useTournamentStore()
const router = useRouter()

</script>

<template>
  <div class="pill clickable" v-for="(tournament, index) in store.allTournaments" :key="index" @click="selectTournament(tournament)">{{ tournament.title }}</div>
</template>