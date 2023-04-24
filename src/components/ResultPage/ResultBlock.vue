<template>
  <div class="centered-text" v-if="isLoading">
    <h4>Поиск пользователей...</h4>
  </div>
  <div
    v-else-if="searchListResult.length"
    class="uk-grid-column-small uk-grid-row-large uk-child-width-1-3@s uk-text-center"
    uk-grid
  >
    <div v-for="user in searchListResult" :key="user.id">
      <div class="uk-card uk-card-default uk-card-body">
        <div class="uk-card-header">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand">
              <h3 class="uk-card-title uk-margin-remove-bottom">
                {{ user.id }} {{ user.nickname }}
              </h3>
              <p class="uk-text-meta uk-margin-remove-top">
                <time datetime="2016-04-01T19:00">{{
                  user.surname_and_name
                }}</time>
              </p>
            </div>
          </div>
        </div>
        <div class="uk-card-body">
          <p>
            {{ user.email }}
          </p>
          <p>
            {{ user.ip }}
          </p>
          <p>
            {{ user.phone }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="centered-text" v-else>
    <h4>Ничего не найдено</h4>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import store from "@/store/index";

const isLoading = ref(false);

const searchListResult = ref([]);
const searchTypedValue = computed(() => {
  return store.getters.getSearchTypedValue;
});

const fetchUserList = async () => {
  await store.dispatch("fetchUserListByType");

  searchListResult.value = store.getters.getSearchList;
};

watch(
  () => searchTypedValue.value,
  async () => {
    isLoading.value = true;
    await fetchUserList();
    isLoading.value = false;
  }
);

onMounted(async () => {
  isLoading.value = true;
  await fetchUserList();
  isLoading.value = false;
});
</script>

<style scoped>
.centered-text {
}
</style>