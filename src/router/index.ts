import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/authentication/LoginView.vue'),
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('../views/authentication/RegisterView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard/UserDashboardView.vue'),
    },
    {
      path: '/auth/verify',
      name: 'verify',
      component: () => import('../views/authentication/VerifyView.vue'),
    },
  ],
})

export default router
