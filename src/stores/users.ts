import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UserFilters, UserFormData } from '@/types/user'
import { toast } from 'vue-sonner'

export const useUserStore = defineStore('users', () => {
  // State
  const users = ref<User[]>([])
  const filters = ref<UserFilters>({
    search: '',
    role: [],
    status: [],
    sortBy: 'name',
    sortOrder: 'asc'
  })
  const isLoading = ref(false)

  // Computed
  const filteredUsers = computed(() => {
    return users.value
      .filter(user => {
        if (filters.value.search) {
          const search = filters.value.search.toLowerCase()
          if (!user.name.toLowerCase().includes(search) &&
              !user.email.toLowerCase().includes(search)) {
            return false
          }
        }
        if (filters.value.role.length && !filters.value.role.includes(user.role)) {
          return false
        }
        if (filters.value.status.length && !filters.value.status.includes(user.status)) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        const aValue = a[filters.value.sortBy]
        const bValue = b[filters.value.sortBy]
        if (aValue === undefined || bValue === undefined) return 0
        const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0
        return filters.value.sortOrder === 'asc' ? comparison : -comparison
      })
  })

  // Actions
  async function fetchUsers() {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      // Load mock data
      users.value = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'admin',
          status: 'active',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'user',
          status: 'active',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Bob Wilson',
          email: 'bob@example.com',
          role: 'moderator',
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      ]
      toast.success('Users loaded successfully')
    } catch (error) {
      toast.error('Failed to load users')
    } finally {
      isLoading.value = false
    }
  }

  async function createUser(data: UserFormData) {
    try {
      const newUser: User = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date().toISOString()
      }
      users.value.push(newUser)
      toast.success('User created successfully')
      return newUser
    } catch (error) {
      toast.error('Failed to create user')
      throw error
    }
  }

  async function updateUser(id: string, data: Partial<UserFormData>) {
    try {
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        const existing = users.value[index]!
        users.value[index] = {
          id: existing.id,
          name: data.name ?? existing.name,
          email: data.email ?? existing.email,
          role: data.role ?? existing.role,
          status: data.status ?? existing.status,
          createdAt: existing.createdAt,
          avatar: existing.avatar
        }
        toast.success('User updated successfully')
      }
    } catch (error) {
      toast.error('Failed to update user')
      throw error
    }
  }

  async function deleteUser(id: string) {
    try {
      users.value = users.value.filter(u => u.id !== id)
      toast.success('User deleted successfully')
    } catch (error) {
      toast.error('Failed to delete user')
      throw error
    }
  }

  function updateFilters(newFilters: Partial<UserFilters>) {
    filters.value = { ...filters.value, ...newFilters }
  }

  return {
    users,
    filters,
    isLoading,
    filteredUsers,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    updateFilters
  }
})
