<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/users', label: 'Users' },
  { path: '/products', label: 'Products' },
  { path: '/components', label: 'Components' },
  { path: '/workflows', label: 'Workflows' }
]
</script>

<template>
  <nav class="border-b">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/" class="font-bold text-xl">
          shadcn Vue
        </RouterLink>
        <div class="flex items-center gap-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
          >
            <Button variant="ghost" size="sm">{{ item.label }}</Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
