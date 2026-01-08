<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/users'
import { useProductStore } from '@/stores/products'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const userStore = useUserStore()
const productStore = useProductStore()

onMounted(() => {
  userStore.fetchUsers()
  productStore.fetchProducts()
})

const recentActivity = [
  { id: 1, action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
  { id: 2, action: 'Order placed', user: 'Jane Smith', time: '15 minutes ago' },
  { id: 3, action: 'Product updated', user: 'Admin', time: '1 hour ago' },
  { id: 4, action: 'Payment received', user: 'Bob Wilson', time: '2 hours ago' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Metrics Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Users</CardTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-muted-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ userStore.users.length }}</div>
          <p class="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Products</CardTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-muted-foreground"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ productStore.products.length }}</div>
          <p class="text-xs text-muted-foreground">+12 new this week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Active Now</CardTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-muted-foreground"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">+573</div>
          <p class="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Revenue</CardTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-muted-foreground"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">$45,231</div>
          <p class="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>
    </div>

    <!-- Charts and Recent Activity -->
    <div class="grid gap-4 md:grid-cols-2">
      <!-- Quick Stats -->
      <Card>
        <CardHeader>
          <CardTitle>User Distribution</CardTitle>
          <CardDescription>Users by role</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Admins</span>
              </div>
              <Badge variant="secondary">{{ userStore.users.filter(u => u.role === 'admin').length }}</Badge>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Users</span>
              </div>
              <Badge variant="secondary">{{ userStore.users.filter(u => u.role === 'user').length }}</Badge>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Moderators</span>
              </div>
              <Badge variant="secondary">{{ userStore.users.filter(u => u.role === 'moderator').length }}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Category Distribution -->
      <Card>
        <CardHeader>
          <CardTitle>Products by Category</CardTitle>
          <CardDescription>Inventory breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div v-for="category in productStore.categories" :key="category" class="flex items-center justify-between">
              <span class="capitalize">{{ category }}</span>
              <Badge variant="secondary">{{ productStore.products.filter(p => p.category === category).length }}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Recent Activity Table -->
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="activity in recentActivity" :key="activity.id">
              <TableCell class="font-medium">{{ activity.action }}</TableCell>
              <TableCell>{{ activity.user }}</TableCell>
              <TableCell class="text-muted-foreground">{{ activity.time }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
