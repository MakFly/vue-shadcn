import type { Product } from './product'

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export interface CartActions {
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}
