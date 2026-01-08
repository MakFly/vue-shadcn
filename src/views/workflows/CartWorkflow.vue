<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/products'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'vue-sonner'

const cartStore = useCartStore()
const productStore = useProductStore()

const isRemoveDialogOpen = ref(false)
const isClearDialogOpen = ref(false)
const itemToRemove = ref<string | null>(null)
const removeConfirmationText = ref('')
const clearConfirmationText = ref('')
const canConfirmRemove = ref(false)
const canConfirmClear = ref(false)

onMounted(() => {
  productStore.fetchProducts()
})

function addToCart(product: any) {
  cartStore.addItem(product)
}

function openRemoveDialog(productId: string) {
  itemToRemove.value = productId
  removeConfirmationText.value = ''
  canConfirmRemove.value = false
  isRemoveDialogOpen.value = true
}

function confirmRemoveItem() {
  if (itemToRemove.value && removeConfirmationText.value === 'SUPPRIMER') {
    cartStore.removeItem(itemToRemove.value)
    isRemoveDialogOpen.value = false
    itemToRemove.value = null
    removeConfirmationText.value = ''
    canConfirmRemove.value = false
  }
}

function cancelRemoveItem() {
  isRemoveDialogOpen.value = false
  itemToRemove.value = null
  removeConfirmationText.value = ''
  canConfirmRemove.value = false
}

function updateRemoveConfirmation(value: string) {
  removeConfirmationText.value = value
  canConfirmRemove.value = value === 'SUPPRIMER'
}

function openClearDialog() {
  clearConfirmationText.value = ''
  canConfirmClear.value = false
  isClearDialogOpen.value = true
}

function confirmClearCart() {
  if (clearConfirmationText.value === 'SUPPRIMER') {
    cartStore.clearCart()
    isClearDialogOpen.value = false
    clearConfirmationText.value = ''
    canConfirmClear.value = false
  }
}

function cancelClearCart() {
  isClearDialogOpen.value = false
  clearConfirmationText.value = ''
  canConfirmClear.value = false
}

function updateClearConfirmation(value: string) {
  clearConfirmationText.value = value
  canConfirmClear.value = value === 'SUPPRIMER'
}

function updateQuantity(productId: string, quantity: number) {
  cartStore.updateQuantity(productId, quantity)
}

function clearCart() {
  cartStore.clearCart()
}

function checkout() {
  toast.success(`Checkout successful! Total: $${cartStore.totalPrice.toFixed(2)}`)
  clearCart()
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">Shopping Cart Workflow</h1>
      <p class="text-muted-foreground">
        E-commerce shopping cart with Pinia store and real-time updates
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <!-- Products -->
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Click to add to cart</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="productStore.isLoading" class="text-center py-4">Loading products...</div>
          <div v-else class="space-y-3">
            <div
              v-for="product in productStore.products"
              :key="product.id"
              class="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors"
            >
              <div class="flex-1">
                <h4 class="font-semibold">{{ product.name }}</h4>
                <p class="text-sm text-muted-foreground">{{ product.description }}</p>
                <p class="text-sm font-medium mt-1">${{ product.price.toFixed(2) }}</p>
              </div>
              <Button
                size="sm"
                :disabled="product.stock === 0"
                @click="addToCart(product)"
              >
                {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Cart -->
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle>Shopping Cart</CardTitle>
              <CardDescription>{{ cartStore.totalItems }} items</CardDescription>
            </div>
            <Button
              v-if="cartStore.items.length > 0"
              variant="destructive"
              size="sm"
              @click="openClearDialog"
            >
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div v-if="cartStore.items.length === 0" class="text-center py-8 text-muted-foreground">
            Your cart is empty
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="flex items-center gap-3 p-3 border rounded-lg"
            >
              <div class="flex-1">
                <h4 class="font-semibold">{{ item.product.name }}</h4>
                <p class="text-sm text-muted-foreground">${{ item.product.price.toFixed(2) }} each</p>
              </div>
              <div class="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  @click="updateQuantity(item.productId, item.quantity - 1)"
                >
                  -
                </Button>
                <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
                <Button
                  variant="outline"
                  size="sm"
                  :disabled="item.quantity >= item.product.stock"
                  @click="updateQuantity(item.productId, item.quantity + 1)"
                >
                  +
                </Button>
              </div>
              <div class="text-right min-w-[80px]">
                <p class="font-semibold">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  class="h-6 text-red-500 hover:text-red-600"
                  @click="openRemoveDialog(item.productId)"
                >
                  Remove
                </Button>
              </div>
            </div>

            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <Button class="w-full" size="lg" @click="checkout">
                Checkout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Workflow Features</CardTitle>
      </CardHeader>
      <CardContent class="space-y-2 text-sm text-muted-foreground">
        <p>✓ Add products to cart with toast notifications</p>
        <p>✓ Real-time quantity updates</p>
        <p>✓ Remove items from cart with secure confirmation</p>
        <p>✓ Automatic total calculation</p>
        <p>✓ Stock validation</p>
        <p>✓ Pinia store for cart state</p>
        <p>✓ Clear cart functionality with secure confirmation</p>
      </CardContent>
    </Card>

    <!-- Remove Item Confirmation Dialog -->
    <AlertDialog v-model:open="isRemoveDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Item from Cart?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The item will be removed from your shopping cart.
            To confirm, please type <span class="font-bold text-destructive">SUPPRIMER</span> below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div class="py-4">
          <Input
            v-model="removeConfirmationText"
            placeholder="Type SUPPRIMER to confirm"
            @input="updateRemoveConfirmation($event.target.value)"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel @click="cancelRemoveItem">Cancel</AlertDialogCancel>
          <AlertDialogAction
            :disabled="!canConfirmRemove"
            @click="confirmRemoveItem"
            class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Remove Item
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- Clear Cart Confirmation Dialog -->
    <AlertDialog v-model:open="isClearDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear Entire Cart?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All items will be removed from your shopping cart.
            To confirm, please type <span class="font-bold text-destructive">SUPPRIMER</span> below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div class="py-4">
          <Input
            v-model="clearConfirmationText"
            placeholder="Type SUPPRIMER to confirm"
            @input="updateClearConfirmation($event.target.value)"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel @click="cancelClearCart">Cancel</AlertDialogCancel>
          <AlertDialogAction
            :disabled="!canConfirmClear"
            @click="confirmClearCart"
            class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Clear Cart
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
