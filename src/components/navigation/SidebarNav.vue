<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { cn } from '@/lib/utils'

const route = useRoute()

const navigation = [
  {
    title: 'Components',
    items: [
      { path: '/components/sonner', label: 'Sonner' },
      { path: '/components/popover', label: 'Popover' },
      { path: '/components/dialog', label: 'Dialog' },
      { path: '/components/input-group', label: 'Input Group' }
    ]
  },
  {
    title: 'Forms',
    items: [
      { path: '/form-validation', label: 'Form Validation' }
    ]
  },
  {
    title: 'Workflows',
    items: [
      { path: '/workflows/crud', label: 'CRUD Workflow' },
      { path: '/workflows/multi-step', label: 'Multi-Step Form' },
      { path: '/workflows/cart', label: 'Shopping Cart' }
    ]
  },
  {
    title: 'Main Pages',
    items: [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/users', label: 'Users' },
      { path: '/products', label: 'Products' }
    ]
  }
]
</script>

<template>
  <aside class="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background p-6 overflow-y-auto">
    <RouterLink to="/" class="font-bold text-xl mb-8 block">
      shadcn Vue
    </RouterLink>

    <nav class="space-y-6">
      <div v-for="section in navigation" :key="section.title">
        <h3 class="font-semibold mb-2 text-sm text-muted-foreground">
          {{ section.title }}
        </h3>
        <ul class="space-y-1">
          <li v-for="item in section.items" :key="item.path">
            <RouterLink
              :to="item.path"
              :class="cn(
                'block px-3 py-2 rounded-md text-sm transition-colors',
                route.path === item.path
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              )"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>
