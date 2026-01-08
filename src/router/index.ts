import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/LandingPage.vue'),
    meta: { layout: 'landing' }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/DashboardView.vue'),
    meta: { layout: 'default', title: 'Dashboard' }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/users/UsersView.vue'),
    meta: { layout: 'default', title: 'Users' }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/products/ProductsView.vue'),
    meta: { layout: 'default', title: 'Products' }
  },
  {
    path: '/components/sonner',
    name: 'component-sonner',
    component: () => import('@/views/components/SonnerDemo.vue'),
    meta: { layout: 'docs', title: 'Sonner - Toast Notifications' }
  },
  {
    path: '/components/popover',
    name: 'component-popover',
    component: () => import('@/views/components/PopoverDemo.vue'),
    meta: { layout: 'docs', title: 'Popover' }
  },
  {
    path: '/components/dialog',
    name: 'component-dialog',
    component: () => import('@/views/components/DialogDemo.vue'),
    meta: { layout: 'docs', title: 'Dialog' }
  },
  {
    path: '/components/input-group',
    name: 'component-input-group',
    component: () => import('@/views/components/InputGroupDemo.vue'),
    meta: { layout: 'docs', title: 'Input Group' }
  },
  {
    path: '/form-validation',
    name: 'form-validation',
    component: () => import('@/views/form-validation/FormValidationDemo.vue'),
    meta: { layout: 'docs', title: 'Form Validation' }
  },
  {
    path: '/workflows/crud',
    name: 'workflow-crud',
    component: () => import('@/views/workflows/CrudWorkflow.vue'),
    meta: { layout: 'docs', title: 'CRUD Workflow' }
  },
  {
    path: '/workflows/multi-step',
    name: 'workflow-multi-step',
    component: () => import('@/views/workflows/MultiStepWorkflow.vue'),
    meta: { layout: 'docs', title: 'Multi-Step Form' }
  },
  {
    path: '/workflows/cart',
    name: 'workflow-cart',
    component: () => import('@/views/workflows/CartWorkflow.vue'),
    meta: { layout: 'docs', title: 'Shopping Cart' }
  },
  {
    path: '/components',
    redirect: '/components/sonner'
  },
  {
    path: '/workflows',
    redirect: '/workflows/crud'
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

export default router
