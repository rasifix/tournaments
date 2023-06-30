<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import PlayerItem from './PlayerItem.vue'

const props = defineProps([ 'players' ])
const emit = defineEmits(["add", "remove"])

const newPlayerText = ref('')

const addPlayer = () => {
    emit("add", newPlayerText.value)
    newPlayerText.value = ''
}

const removePlayer = (index) => emit("remove", index)

</script>

<template>
	<form v-on:submit.prevent="addPlayer">
    <input
      v-model="newPlayerText"
      id="new-player"
      placeholder="Name"
    />
  </form>
  <ul class="content">
    <player-item
      v-for="(player, index) in players"
      :key="player.id"
      :title="player.title"
      @remove="removePlayer(index)"
    ></player-item>
  </ul>
</template>

<style scoped>
ul.content {
    max-height: calc(100vh - 250px);
    overflow: scroll;
}

input {
    margin-bottom: 1rem;
    height: 2.5rem;
    border-radius: 5px;
    background-color: #333;
    border: 1px solid #999;
    color: white;
    padding: 1rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    width: 100%;
}
button {
    margin-left: 1rem;
    visibility: hidden;
}
ul {
    list-style-type: none;
    padding-left: 0px;
}
li {
    padding: 6px;
    border-bottom: 1px solid #666;
    font-size: 1.2rem;
}
li:last-child {
    border-bottom: none
}
</style>