import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, ProductFilters, ProductFormData } from '@/types/product'
import { toast } from 'vue-sonner'

export const useProductStore = defineStore('products', () => {
  // State
  const products = ref<Product[]>([])
  const filters = ref<ProductFilters>({
    search: '',
    category: [],
    priceRange: [0, 1000],
    inStock: false,
    sortBy: 'name',
    sortOrder: 'asc'
  })
  const isLoading = ref(false)

  // Computed
  const filteredProducts = computed(() => {
    return products.value
      .filter(product => {
        if (filters.value.search) {
          const search = filters.value.search.toLowerCase()
          if (!product.name.toLowerCase().includes(search) &&
              !product.description.toLowerCase().includes(search)) {
            return false
          }
        }
        if (filters.value.category.length && !filters.value.category.includes(product.category)) {
          return false
        }
        if (filters.value.inStock && product.stock === 0) {
          return false
        }
        const [minPrice, maxPrice] = filters.value.priceRange
        if (product.price < minPrice || product.price > maxPrice) {
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

  const categories = computed(() => {
    return [...new Set(products.value.map(p => p.category))]
  })

  // Actions
  async function fetchProducts() {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      products.value = [
        {
          id: '1',
          name: 'Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 299.99,
          stock: 50,
          category: 'Electronics',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Smart Watch',
          description: 'Feature-rich smartwatch with health tracking',
          price: 399.99,
          stock: 30,
          category: 'Electronics',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Coffee Maker',
          description: ' programmable coffee maker with thermal carafe',
          price: 89.99,
          stock: 0,
          category: 'Home',
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Running Shoes',
          description: 'Comfortable running shoes with extra cushioning',
          price: 129.99,
          stock: 100,
          category: 'Sports',
          createdAt: new Date().toISOString()
        }
      ]
      toast.success('Products loaded successfully')
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      isLoading.value = false
    }
  }

  async function createProduct(data: ProductFormData) {
    try {
      const newProduct: Product = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date().toISOString()
      }
      products.value.push(newProduct)
      toast.success('Product created successfully')
      return newProduct
    } catch (error) {
      toast.error('Failed to create product')
      throw error
    }
  }

  async function updateProduct(id: string, data: Partial<ProductFormData>) {
    try {
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        const existing = products.value[index]!
        products.value[index] = {
          id: existing.id,
          name: data.name ?? existing.name,
          description: data.description ?? existing.description,
          price: data.price ?? existing.price,
          stock: data.stock ?? existing.stock,
          category: data.category ?? existing.category,
          image: existing.image,
          createdAt: existing.createdAt
        }
        toast.success('Product updated successfully')
      }
    } catch (error) {
      toast.error('Failed to update product')
      throw error
    }
  }

  async function deleteProduct(id: string) {
    try {
      products.value = products.value.filter(p => p.id !== id)
      toast.success('Product deleted successfully')
    } catch (error) {
      toast.error('Failed to delete product')
      throw error
    }
  }

  function updateFilters(newFilters: Partial<ProductFilters>) {
    filters.value = { ...filters.value, ...newFilters }
  }

  return {
    products,
    filters,
    isLoading,
    filteredProducts,
    categories,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    updateFilters
  }
})
