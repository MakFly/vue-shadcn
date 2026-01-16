<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppSidebar from '@/components/AppSidebar.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SectionCards from '@/components/SectionCards.vue'
import ChartAreaInteractive from '@/components/ChartAreaInteractive.vue'
import DataTable from '@/components/DataTable.vue'
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  toast.success('Déconnexion réussie!')
  router.push('/login')
}

// Data for the DataTable
const tableData = [
  {
    id: 1,
    header: "Cover page",
    type: "Cover page",
    status: "In Process",
    target: "18",
    limit: "5",
    reviewer: "Eddie Lake",
  },
  {
    id: 2,
    header: "Table of contents",
    type: "Table of contents",
    status: "Done",
    target: "29",
    limit: "24",
    reviewer: "Eddie Lake",
  },
  {
    id: 3,
    header: "Executive summary",
    type: "Narrative",
    status: "Done",
    target: "10",
    limit: "13",
    reviewer: "Eddie Lake",
  },
  {
    id: 4,
    header: "Technical approach",
    type: "Narrative",
    status: "Done",
    target: "27",
    limit: "23",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 5,
    header: "Design",
    type: "Narrative",
    status: "In Process",
    target: "2",
    limit: "16",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 6,
    header: "Capabilities",
    type: "Narrative",
    status: "In Process",
    target: "20",
    limit: "8",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 7,
    header: "Integration with existing systems",
    type: "Narrative",
    status: "In Process",
    target: "19",
    limit: "21",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 8,
    header: "Innovation and Advantages",
    type: "Narrative",
    status: "Done",
    target: "25",
    limit: "26",
    reviewer: "Assign reviewer",
  },
  {
    id: 9,
    header: "Overview of EMR's Innovative Solutions",
    type: "Technical content",
    status: "Done",
    target: "7",
    limit: "23",
    reviewer: "Assign reviewer",
  },
  {
    id: 10,
    header: "Advanced Algorithms and Machine Learning",
    type: "Narrative",
    status: "Done",
    target: "30",
    limit: "28",
    reviewer: "Assign reviewer",
  },
]
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <SiteHeader />
      <div class="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
        <!-- Page Title Header -->
        <div class="flex flex-col gap-1 px-4 lg:px-6">
          <h1 class="text-3xl font-bold tracking-tight">
            Documents
          </h1>
          <p class="text-muted-foreground">
            Overview of your documents and their status
          </p>
        </div>

        <!-- Section Cards -->
        <SectionCards />

        <!-- Chart Section -->
        <div class="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>

        <!-- DataTable Section -->
        <DataTable :data="tableData" />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
