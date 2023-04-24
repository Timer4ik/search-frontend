import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import SearchResultPage from "@/pages/SearchResultPage.vue"

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage
  },
  {
    path: '/search-result',
    name: 'search-result',
    component: SearchResultPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
