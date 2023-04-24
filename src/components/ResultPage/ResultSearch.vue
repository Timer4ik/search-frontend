<template>
  <div class="search-block">
    <div>
      <div class="search-type">
        Тип поисковой сущности:
        <span class="bold-font">{{
          searchTypedValue?.type?.ru ?? "неопределён"
        }}</span>
      </div>
      <div class="search-type">
        Значение поиска:
        <span class="bold-font">{{ searchTypedValue?.handledValue }}</span>
      </div>
    </div>
    <SearchForm
      :value="searchValue"
      @input="handleInput"
      @submit="handleSubmit"
    />
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

  searchTypedValue.value = getCheckResult(value);
};

const handleSubmit = (event) => {
  store.commit("setSearchTypedValue", searchTypedValue.value);
};
</script>

<style scoped>
.search-type {
}
.bold-font {
  font-weight: bold;
}
</style>