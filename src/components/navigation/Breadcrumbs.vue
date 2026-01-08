<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'

const route = useRoute()

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  return paths.map((path, index) => {
    const url = '/' + paths.slice(0, index + 1).join('/')
    return {
      label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
      url: index === paths.length - 1 ? null : url
    }
  })
})
</script>

<template>
  <nav class="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
    <RouterLink to="/" class="hover:text-foreground">
      Home
    </RouterLink>
    <ChevronRight v-if="breadcrumbs.length > 0" class="h-4 w-4" />
    <template v-for="(crumb, index) in breadcrumbs" :key="crumb.url || index">
      <ChevronRight v-if="index > 0" class="h-4 w-4" />
      <RouterLink
        v-if="crumb.url"
        :to="crumb.url"
        class="hover:text-foreground"
      >
        {{ crumb.label }}
      </RouterLink>
      <span v-else class="text-foreground font-medium">
        {{ crumb.label }}
      </span>
    </template>
  </nav>
</template>
