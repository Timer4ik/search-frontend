<template>
  <div class="myWrapper">
    <RouterLink to="/">Вернуться на главную</RouterLink>
    <ResultSearch />
    <SearchResult />
  </div>
</template>

<script setup>
import SearchResult from "@/components/ResultPage/ResultBlock.vue";
import ResultSearch from "@/components/ResultPage/ResultSearch.vue";
</script>

<style scoped>
.myWrapper {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  padding: 15px;
}
</style>