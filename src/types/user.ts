export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  avatar?: string
}

export interface UserFilters {
  search: string
  role: string[]
  status: string[]
  sortBy: keyof User
  sortOrder: 'asc' | 'desc'
}

export interface UserFormData {
  name: string
  email: string
  role: User['role']
  status: User['status']
}
