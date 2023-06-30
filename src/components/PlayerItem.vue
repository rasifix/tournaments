<script setup>
defineProps(['title'])
defineEmits(['remove'])
</script>

<template>
  <li>
    <span>{{ title }}</span>
    <button @click="$emit('remove')" class="clickable">
      <svg version="1.1" width="20" height="20" viewBox="0 0 36 36" fill="white" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M27.14,34H8.86A2.93,2.93,0,0,1,6,31V11.23H8V31a.93.93,0,0,0,.86,1H27.14A.93.93,0,0,0,28,31V11.23h2V31A2.93,2.93,0,0,1,27.14,34Z"/>
  <path d="M30.78,9H5A1,1,0,0,1,5,7H30.78a1,1,0,0,1,0,2Z"/><rect x="21" y="13" width="2" height="15"/><rect x="13" y="13" width="2" height="15"/><path d="M23,5.86H21.1V4H14.9V5.86H13V4a2,2,0,0,1,1.9-2h6.2A2,2,0,0,1,23,4Z"/>
</svg>
    </button>
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

.trash-icon {
  background-image: url('~@/assets/trash-line.svg');
}
</style>