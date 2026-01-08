<script setup lang="ts">
import SidebarNav from '@/components/navigation/SidebarNav.vue'
import Breadcrumbs from '@/components/navigation/Breadcrumbs.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <SidebarNav />
    <div class="lg:pl-64">
      <div class="container mx-auto px-4 py-8">
        <Breadcrumbs />
        <main>
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
