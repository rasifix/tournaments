<script setup>
import PlayerList from '../components/PlayerList.vue'

import { ref } from 'vue'
import { usePlayerStore } from '../stores/player'

const store = usePlayerStore()

function addPlayer(name) {
  store.addPlayer({ title: name })
}

function removePlayer(index) {
  store.removePlayer(index)
}

</script>

<template>
  <main>
    <h1 style="text-align: center;">Spieler verwalten</h1>
    <PlayerList :players="store.players" @add="addPlayer" @remove="removePlayer"/>
    <div class="footer"><button class="primary" @click="$router.push('/')">Back</button></div>
  </main>
</template>

<style scope>
div.footer {
    position: fixed;
    bottom: 0;
    margin-bottom: 30px;
}

button {
    border-radius: 6px;
    border: none;
    color: white;
    text-transform: uppercase;
    background-color: #0084bd;
}
</style>