<script setup>
defineProps(['title'])
defineEmits(['remove'])
</script>

<template>
  <li>
    <span>{{ title }}</span>
    <button @click="$emit('remove')">&#x1F5D1;</button>
  </li>
</template>

<style scoped>
li {
    display: flex;
}
li span {
    flex: 1
}
li button {
    width: 50px;
    color: white;
    background-color: red;
    border: none;
    border-radius: 6px;
    font-size: 1.2rem;
    padding: 0px;
    max-height: 34px;
}
li button:hover {
    background-color: #F11;
}
</style>