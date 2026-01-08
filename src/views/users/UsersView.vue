<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-vue-next'

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Types
interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
}

// Data
const data = ref<User[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

async function fetchUsers() {
  isLoading.value = true
  error.value = null
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) throw new Error('Failed to fetch users')
    data.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})

// Column definitions
const columns: ColumnDef<User>[] = [
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
    accessorKey: 'username',
    header: 'Username',
    cell: (info) => info.getValue<string>(),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => info.getValue<string>(),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: (info) => info.getValue<string>(),
  },
  {
    accessorKey: 'website',
    header: 'Website',
    cell: (info) => {
      const value = info.getValue<string>()
      return value ? `[${value}](https://${value})` : ''
    },
  },
  {
    accessorKey: 'company',
    header: 'Company',
    cell: (info) => info.getValue<User['company']>()?.name || '',
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
  get data() { return data.value },
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
</script>

<template>
  <div class="space-y-4">
    <!-- Filters -->
    <div class="flex items-center justify-between">
      <Input
        placeholder="Filter emails..."
        :model-value="(table.getColumn('email')?.getFilterValue() as string) ?? ''"
        @input="table.getColumn('email')?.setFilterValue($event.target.value)"
        class="max-w-sm"
      />
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
          <template v-if="isLoading">
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                Loading users from jsonplaceholder...
              </TableCell>
            </TableRow>
          </template>
          <template v-else-if="error">
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center text-red-500">
                {{ error }}
              </TableCell>
            </TableRow>
          </template>
          <template v-else-if="table.getRowModel().rows?.length === 0">
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
  </div>
</template>
