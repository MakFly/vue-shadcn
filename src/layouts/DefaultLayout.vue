<script setup lang="ts">
import { useRoute } from 'vue-router'
import TopNav from '@/components/navigation/TopNav.vue'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen bg-background">
    <TopNav />
    <main class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <h1 class="text-3xl font-bold">{{ route.meta.title || 'Dashboard' }}</h1>
      </div>
      <slot />
    </main>
  </div>
</template>
