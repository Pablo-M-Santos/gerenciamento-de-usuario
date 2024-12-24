import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import LoginPage from '@/pages/LoginPage.vue'
import UserPage from '@/pages/UserPage.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/user',
    name: 'user',
    component: UserPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useAuthStore()
  userStore.initializeUser()
  if (to.meta.requiresAuth && !userStore.user) {
    next('/')
  } else {
    next()
  }
})

export default router
