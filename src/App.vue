<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<script setup>
import { ref } from "vue";

const searchValue = ref(() => "");
</script>


<style scoped>
.search-block {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
