<template>
  <div class="search-block">
    <div>
      <SearchField v-model="searchValue" />
    </div>
    <div>
      <pre> {{ searchValue && JSON.stringify(getCheckResult(searchValue)) }}</pre>
    </div>
    <button @click="handleSearch">Найти</button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import SearchField from "../components/general/SearchField.vue";
import { getCheckResult } from "../utils/searchUtils";

const searchValue = ref("dsf ds");

const handleSearch = () => {
    
}

</script>

<style scoped>
.search-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>