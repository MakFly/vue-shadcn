<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DocsLayout from '@/layouts/DocsLayout.vue'
import LandingLayout from '@/layouts/LandingLayout.vue'

const route = useRoute()

const layout = computed(() => {
  switch (route.meta.layout) {
    case 'landing':
      return LandingLayout
    case 'docs':
      return DocsLayout
    default:
      return DefaultLayout
  }
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
  <Toaster />
</template>
