<script setup>
import TournamentList from '../components/TournamentList.vue';
import { useTournamentStore  } from '../stores/tournament';

const store = useTournamentStore()

</script>

<template>
  <div v-if="!store.hasActiveTournament">
    <h1>Turniere</h1>
    <TournamentList></TournamentList>
  </div>
  <div v-else>
    <h1>Turnier {{ store.activeTournament?.category }} / {{ store.activeTournament?.teams }} Teams</h1>
  </div>
</template>

<style>
  h1 {
    margin-bottom: 1rem;
  }
</style>
