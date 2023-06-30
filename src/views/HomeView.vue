<script setup>

import { computed } from 'vue';
import { usePlayerStore } from '../stores/player'
import { useTournamentStore } from '../stores/tournament';

const playerStore = usePlayerStore()
const tournamentStore = useTournamentStore();

const hasPlayers = computed(() => playerStore.players.length > 0)
const playerCount = computed(() => playerStore.players.length)

const hasActiveTournament = computed(() => !!useTournamentStore.active)

</script>

<template>
  <main>
    <h1 style="text-align: center">Match Center</h1>
    <div class="pill" @click="$router.push('/players')">
      Spieler
      <span style="float:right; display:inline-block; border-radius: 50%; width: 24px; height: 24px; background:white; color: black">{{ playerCount }}</span>
    </div>

    <div v-if="hasActiveTournament" class="pill" @click="$router.push('/tournaments/active')">
      Aktives Turnier
    </div>
    <div v-else-if="hasPlayers" class="pill" @click="$router.push('/tournaments/setup')">
      Turnier starten
    </div>
  </main>
</template>

<style scoped>
.pill {
  text-align: center;
  background-color: #0084bd;
  border-radius: 6px;
  padding: 0.5rem;
  margin: 1rem;
}
</style>
