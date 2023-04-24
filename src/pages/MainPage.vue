<template>
  <div class="search-block">
    <div>
      <SearchField v-model="searchValue" />
    </div>
    <ul>
      <li>
        {{ searchList.map(item => item.email) }}
      </li>
    </ul>
    <div>
      <pre>
 {{ searchValue && JSON.stringify(getCheckResult(searchValue)) }}</pre
      >
    </div>
    <button @click="handleSearch">Найти</button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import SearchField from "../components/general/SearchField.vue";
import { getCheckResult } from "../utils/searchUtils";
import { userList } from "../mock/userList";

const searchList = ref([]);
const searchValue = ref("dsf ds");

const handleSearch = () => {
  searchList.value = userList().filter((item) => {
  console.log(searchValue.value);
    if (getCheckResult(searchValue.value).type == "EMAIL") {
      if (getCheckResult(item.email).handledValue === getCheckResult(searchValue.value).handledValue) return true;
    }
    return false;
  });
};
</script>

<style scoped>
.search-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>