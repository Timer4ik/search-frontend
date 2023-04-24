<template>
  <form
    class="search-form uk-search uk-search-large"
    @submit.prevent="$emit('submit', $event)"
  >
    <span uk-search-icon></span>
    <input
      :value="modelValue"
      @input="handleInput($event)"
      class="uk-search-input"
      type="search"
      placeholder="Search"
      aria-label="Search"
    />
  </form>
</template>

<script setup>
import { nextTick } from "vue";

const props = defineProps(["modelValue"]);
const emits = defineEmits(["update:modelValue", "submit"]);

const handleInput = (event) => {
  emits("update:modelValue", event.target.value);
};
</script>

<style scoped>
.search-form {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>