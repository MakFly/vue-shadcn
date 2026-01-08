<script setup lang="ts">
import { ref, h } from 'vue'
import { useRouter } from 'vue-router'
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  PaginationState,
  VisibilityState,
} from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/vue-table'
import { ChevronDown, ChevronUp, ChevronsUpDown, ShoppingCart, Package } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/stores/cart'
import { toast } from 'vue-sonner'

// Types
interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  category: 'Electronics' | 'Clothing' | 'Books' | 'Home' | 'Sports' | 'Toys'
}

// Data - const products array
const products = ref<Product[]>([
  { id: 1, name: 'Wireless Headphones', description: 'Premium noise-cancelling headphones', price: 199.99, stock: 45, category: 'Electronics' },
  { id: 2, name: 'Running Shoes', description: 'Lightweight and breathable', price: 89.99, stock: 120, category: 'Sports' },
  { id: 3, name: 'Smart Watch', description: 'Fitness tracker with heart rate monitor', price: 299.99, stock: 8, category: 'Electronics' },
  { id: 4, name: 'Denim Jacket', description: 'Classic blue denim jacket', price: 79.99, stock: 35, category: 'Clothing' },
  { id: 5, name: 'Coffee Table Book', description: 'Art and design collection', price: 49.99, stock: 200, category: 'Books' },
  { id: 6, name: 'Yoga Mat', description: 'Non-slip exercise mat', price: 29.99, stock: 150, category: 'Sports' },
  { id: 7, name: 'LED Desk Lamp', description: 'Adjustable brightness lamp', price: 39.99, stock: 0, category: 'Home' },
  { id: 8, name: 'Mechanical Keyboard', description: 'RGB backlit gaming keyboard', price: 149.99, stock: 25, category: 'Electronics' },
  { id: 9, name: 'Winter Coat', description: 'Waterproof insulated coat', price: 189.99, stock: 18, category: 'Clothing' },
  { id: 10, name: 'Novel Collection', description: 'Best-selling fiction set', price: 34.99, stock: 75, category: 'Books' },
  { id: 11, name: 'Throw Pillows Set', description: 'Decorative pillow pack of 4', price: 44.99, stock: 60, category: 'Home' },
  { id: 12, name: 'Building Blocks', description: 'Educational toy set', price: 59.99, stock: 95, category: 'Toys' },
  { id: 13, name: 'Portable Speaker', description: 'Bluetooth waterproof speaker', price: 79.99, stock: 5, category: 'Electronics' },
  { id: 14, name: 'T-Shirt Pack', description: 'Premium cotton 3-pack', price: 39.99, stock: 200, category: 'Clothing' },
  { id: 15, name: 'Cooking Essentials', description: 'Kitchen starter cookbook', price: 24.99, stock: 0, category: 'Books' },
  { id: 16, name: 'Dumbbell Set', description: 'Adjustable weight 5-50lbs', price: 199.99, stock: 12, category: 'Sports' },
  { id: 17, name: 'Wall Art Canvas', description: 'Modern abstract print', price: 69.99, stock: 40, category: 'Home' },
  { id: 18, name: 'Board Game', description: 'Strategy family game', price: 49.99, stock: 30, category: 'Toys' },
  { id: 19, name: 'Wireless Earbuds', description: 'True wireless earbuds', price: 129.99, stock: 55, category: 'Electronics' },
  { id: 20, name: 'Sneakers', description: 'Urban street style sneakers', price: 109.99, stock: 22, category: 'Clothing' },
])

const cartStore = useCartStore()
const router = useRouter()

// Column definitions
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (info) => info.getValue<number>(),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => info.getValue<string>(),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: (info) => info.getValue<string>(),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: (info) => h(Badge, { variant: 'outline' }, () => info.getValue<string>()),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: (info) => `$${info.getValue<number>().toFixed(2)}`,
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: (info) => {
      const stock = info.getValue<number>()
      let variant: 'default' | 'secondary' | 'destructive' = 'default'
      if (stock === 0) variant = 'destructive'
      else if (stock < 10) variant = 'secondary'
      return h(Badge, { variant }, () => `${stock} in stock`)
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const product = row.original
      return h('div', { class: 'flex gap-2' }, [
        h(Button, {
          size: 'sm',
          variant: 'outline',
          disabled: product.stock === 0,
          onClick: () => addToCart(product)
        }, () => product.stock === 0 ? 'Out of Stock' : [h(ShoppingCart, { class: 'mr-2 h-4 w-4' }), 'Add to Cart']),
      ])
    },
  },
]

// Table setup
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: 5,
})

const table = useVueTable({
  get data() { return products.value },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  onSortingChange: (updaterOrValue) => {
    sorting.value = typeof updaterOrValue === 'function'
      ? updaterOrValue(sorting.value)
      : updaterOrValue
  },
  onColumnFiltersChange: (updaterOrValue) => {
    columnFilters.value = typeof updaterOrValue === 'function'
      ? updaterOrValue(columnFilters.value)
      : updaterOrValue
  },
  onColumnVisibilityChange: (updaterOrValue) => {
    columnVisibility.value = typeof updaterOrValue === 'function'
      ? updaterOrValue(columnVisibility.value)
      : updaterOrValue
  },
  onPaginationChange: (updaterOrValue) => {
    pagination.value = typeof updaterOrValue === 'function'
      ? updaterOrValue(pagination.value)
      : updaterOrValue
  },
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get pagination() { return pagination.value },
  },
})

// Actions
function addToCart(product: Product) {
  // Extract values to avoid reactivity issues
  const productName = product.name
  const productPrice = product.price

  // Convert Product to the expected Product type (id must be string)
  const productToAdd = {
    id: product.id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    createdAt: new Date().toISOString()
  }

  cartStore.addItem(productToAdd, 1)
  toast.success(`${productName} added to cart`, {
    description: `$${productPrice.toFixed(2)} - Quantity: 1`,
    action: {
      label: 'View Cart',
      onClick: () => {
        router.push('/workflows/cart')
      },
    },
  })
}

// Computed stats
const totalProducts = products.value.length
const inStockProducts = products.value.filter(p => p.stock > 0).length
const lowStockProducts = products.value.filter(p => p.stock > 0 && p.stock < 10).length
const totalValue = products.value.reduce((sum, p) => sum + (p.price * p.stock), 0)

const categories = Array.from(new Set(products.value.map(p => p.category)))
const selectedCategory = ref<string>('all')

function filterByCategory(value: any) {
  const category = String(value ?? 'all')
  selectedCategory.value = category
  const column = table.getColumn('category')
  if (column) {
    column.setFilterValue(category === 'all' ? '' : category)
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Filters -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-4 flex-wrap">
        <Input
          placeholder="Filter products..."
          :model-value="(table.getColumn('name')?.getFilterValue() as string) ?? ''"
          @input="table.getColumn('name')?.setFilterValue($event.target.value)"
          class="max-w-sm"
        />
        <Select :model-value="selectedCategory" @update:model-value="filterByCategory">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns <ChevronDown class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns()"
            :key="column.id"
            :model-value="column.getIsVisible()"
            @update:model-value="column.toggleVisibility($event)"
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- Table -->
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              v-for="column in table.getVisibleLeafColumns()"
              :key="column.id"
              class="px-4 py-3 text-left"
            >
              <div
                v-if="column.getCanSort()"
                @click="column.toggleSorting()"
                class="flex items-center gap-2 cursor-pointer select-none hover:text-accent-foreground"
              >
                <FlexRender
                  :render="column.columnDef.header"
                  :props="column"
                />
                <component
                  :is="column.getNextSortingOrder() === 'asc' ? ChevronsUpDown : column.getIsSorted() === 'asc' ? ChevronUp : ChevronDown"
                  class="ml-2 h-4 w-4"
                />
              </div>
              <FlexRender
                v-else
                :render="column.columnDef.header"
                :props="column"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length === 0">
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
              >
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between px-2">
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Rows per page</span>
        <Select
          :model-value="String(pagination.pageSize)"
          @update:model-value="(value) => table.setPageSize(Number(value))"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="String(pagination.pageSize)" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="size in [5, 10, 20, 30, 40, 50]" :key="size" :value="String(size)">
              {{ size }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="flex items-center gap-2">
        <div class="text-sm text-muted-foreground">
          Page {{ table.getState().pagination.pageIndex + 1 }} of {{ table.getPageCount() }}
        </div>
        <div class="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            @click="table.setPageIndex(0)"
            :disabled="!table.getCanPreviousPage()"
          >
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            @click="table.previousPage()"
            :disabled="!table.getCanPreviousPage()"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            @click="table.nextPage()"
            :disabled="!table.getCanNextPage()"
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            @click="table.setPageIndex(table.getPageCount() - 1)"
            :disabled="!table.getCanNextPage()"
          >
            Last
          </Button>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid gap-4 md:grid-cols-4">
      <div class="border rounded-lg p-4">
        <div class="flex items-center gap-2">
          <Package class="h-5 w-5 text-muted-foreground" />
          <div>
            <div class="text-sm text-muted-foreground">Total Products</div>
            <div class="text-2xl font-bold">{{ totalProducts }}</div>
          </div>
        </div>
      </div>
      <div class="border rounded-lg p-4">
        <div class="text-sm text-muted-foreground">In Stock</div>
        <div class="text-2xl font-bold">{{ inStockProducts }}</div>
      </div>
      <div class="border rounded-lg p-4">
        <div class="text-sm text-muted-foreground">Low Stock</div>
        <div class="text-2xl font-bold">{{ lowStockProducts }}</div>
      </div>
      <div class="border rounded-lg p-4">
        <div class="text-sm text-muted-foreground">Total Value</div>
        <div class="text-2xl font-bold">${{ totalValue.toFixed(2) }}</div>
      </div>
    </div>

    <!-- Cart Summary -->
    <div v-if="cartStore.items.length > 0" class="border rounded-lg p-4">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-sm text-muted-foreground">Shopping Cart</div>
          <div class="text-lg font-semibold">{{ cartStore.totalItems }} items - ${{ cartStore.totalPrice.toFixed(2) }}</div>
        </div>
        <div class="flex gap-2">
          <RouterLink to="/workflows/cart">
            <Button variant="outline">View Cart</Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
