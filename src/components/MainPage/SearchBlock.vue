<template>
  <div class="search-block">
    <SearchForm
      :value="searchValue"
      @input="handleInput"
      @submit="handleSubmit"
    />
    <div class="search-type">
      Тип поисковой сущности:
      <span class="bold-font">{{ searchTypedValue?.type?.ru ?? "неопределён" }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SearchForm from "@/ui/SearchForm.vue";
import store from "@/store/index";
import { getCheckResult } from "@/utils/searchUtils";

const router = useRouter();

const searchValue = ref("");
const searchTypedValue = ref(null);

const handleInput = (e) => {
  const value = e.target.value.trim().toLowerCase();

  if (!value.length) return (searchTypedValue.value = null);

  searchTypedValue.value = getCheckResult(e.target.value);
};

const handleSubmit = (event) => {
  store.commit("setSearchValue", searchValue.value);
  store.commit("setSearchTypedValue", searchTypedValue.value);

  router.push("search-result");
};
</script>

<style scoped>
.search-block {
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search-type {
}
.bold-font {
  font-weight: bold;
}
</style>