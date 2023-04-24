<template>
  <div class="myWrapper">
    <RouterLink to="/">Вернуться на главную</RouterLink>
    <div
      v-if="searchListResult.length"
      class="uk-grid-column-small uk-grid-row-large uk-child-width-1-3@s uk-text-center"
      uk-grid
    >
      <div v-for="user in searchListResult" :key="user.id">
        <div class="uk-card uk-card-default uk-card-body">
          <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
              <div class="uk-width-expand">
                <h3 class="uk-card-title uk-margin-remove-bottom">
                  {{ user.nickname }}
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
      <h1>Ничего не найдено</h1>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import store from "@/store/index";

const searchListResult = ref([]);

onMounted(async () => {
  await store.dispatch("fetchUserListByType");

  searchListResult.value = store.getters.getSearchList;
});
</script>

<style scoped>
.myWrapper {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
}
.centered-text {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

</style>