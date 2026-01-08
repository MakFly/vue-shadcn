export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  image?: string
  createdAt: string
}

export interface ProductFilters {
  search: string
  category: string[]
  priceRange: [number, number]
  inStock: boolean
  sortBy: keyof Product
  sortOrder: 'asc' | 'desc'
}

export interface ProductFormData {
  name: string
  description: string
  price: number
  stock: number
  category: string
}
