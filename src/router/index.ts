import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
    meta: { layout: 'none' }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/404',
    name: 'not-found',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: { layout: 'none' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// Route guard pour protéger le dashboard
router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Préserver le redirectTo pour après connexion
    const redirectTo = to.fullPath !== '/dashboard' ? to.fullPath : undefined
    return {
      path: '/login',
      query: redirectTo ? { redirectTo } : undefined,
    }
  }

  if (to.path === '/login' && authStore.isAuthenticated) {
    return '/dashboard'
  }
})

export default router
