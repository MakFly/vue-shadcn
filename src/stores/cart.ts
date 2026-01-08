import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem, Product } from '@/types'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([])

  // Computed
  const totalItems = computed(() =>
    items.value.reduce((sum: number, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum: number, item) => sum + (item.product.price * item.quantity), 0)
  )

  // Actions
  function addItem(product: Product, quantity: number = 1) {
    const existingItem = items.value.find(item => item.productId === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        id: crypto.randomUUID(),
        productId: product.id,
        product,
        quantity
      })
    }
  }

  function removeItem(productId: string) {
    items.value = items.value.filter((i: CartItem) => i.productId !== productId)
  }

  function updateQuantity(productId: string, quantity: number) {
    const item = items.value.find((i: CartItem) => i.productId === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
})
