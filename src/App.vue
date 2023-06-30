<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { usePlayerStore } from './stores/player';

onMounted(() => {
  const item = localStorage.getItem("kifu")
  if (item) {
      const state = JSON.parse(item)
      usePlayerStore().setPlayers(state)
  }
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

body {
  background-color: #333;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
