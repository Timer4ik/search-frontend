<template>
  <input :value="modelValue" @input="handleInput($event)" />
</template>

<script setup>
import { nextTick } from "vue";

const props = defineProps(["modelValue"]);
const emits = defineEmits(["update:modelValue"]);

const handleInput = (event) => {
  emits("update:modelValue", event.target.value);
};
</script>
