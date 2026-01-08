<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'vue-sonner'

const userStore = useUserStore()
const isDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const userToDelete = ref<string | null>(null)
const deleteConfirmationText = ref('')
const editingUser = ref<{ id: string; name: string; email: string; role: string; status: string } | null>(null)

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['user', 'admin', 'moderator'], {
    required_error: 'Please select a role',
  }),
  status: z.enum(['active', 'inactive', 'pending'], {
    required_error: 'Please select a status',
  }),
}))

const form = useForm({
  validationSchema: formSchema,
})

const canConfirmDelete = ref(false)

onMounted(() => {
  userStore.fetchUsers()
})

function openCreateDialog() {
  editingUser.value = null
  form.resetForm()
  isDialogOpen.value = true
}

function openEditDialog(user: any) {
  editingUser.value = user
  form.setValues({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  })
  isDialogOpen.value = true
}

async function saveUser() {
  const isValid = await form.validate()
  if (!isValid.valid) {
    return
  }

  const values = form.values

  if (editingUser.value) {
    await userStore.updateUser(editingUser.value.id, values)
  } else {
    await userStore.createUser(values)
  }
  isDialogOpen.value = false
  form.resetForm()
}

function openDeleteDialog(id: string) {
  userToDelete.value = id
  deleteConfirmationText.value = ''
  canConfirmDelete.value = false
  isDeleteDialogOpen.value = true
}

async function confirmDelete() {
  if (userToDelete.value && deleteConfirmationText.value === 'SUPPRIMER') {
    await userStore.deleteUser(userToDelete.value)
    isDeleteDialogOpen.value = false
    userToDelete.value = null
    deleteConfirmationText.value = ''
    canConfirmDelete.value = false
  }
}

function cancelDelete() {
  isDeleteDialogOpen.value = false
  userToDelete.value = null
  deleteConfirmationText.value = ''
  canConfirmDelete.value = false
}

function updateDeleteConfirmation(value: string) {
  deleteConfirmationText.value = value
  canConfirmDelete.value = value === 'SUPPRIMER'
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">CRUD Workflow</h1>
      <p class="text-muted-foreground">
        Complete CRUD operations with Pinia store and Sonner notifications
      </p>
    </div>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle>Users Management</CardTitle>
            <CardDescription>Create, read, update, and delete users</CardDescription>
          </div>
          <Button @click="openCreateDialog">Add User</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-if="userStore.isLoading">
              <TableCell :colspan="5" class="text-center">Loading...</TableCell>
            </TableRow>
            <TableRow v-else-if="userStore.filteredUsers.length === 0">
              <TableCell :colspan="5" class="text-center">No users found</TableCell>
            </TableRow>
            <TableRow v-else v-for="user in userStore.filteredUsers" :key="user.id">
              <TableCell class="font-medium">{{ user.name }}</TableCell>
              <TableCell>{{ user.email }}</TableCell>
              <TableCell>{{ user.role }}</TableCell>
              <TableCell>{{ user.status }}</TableCell>
              <TableCell class="text-right">
                <Button variant="ghost" size="sm" @click="openEditDialog(user)">Edit</Button>
                <Button variant="ghost" size="sm" @click="openDeleteDialog(user.id)">Delete</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Dialog v-model:open="isDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ editingUser ? 'Edit User' : 'Create User' }}</DialogTitle>
          <DialogDescription>
            {{ editingUser ? 'Update user information below.' : 'Add a new user to the system.' }}
          </DialogDescription>
        </DialogHeader>
        <form @submit.prevent="saveUser">
          <div class="grid gap-4 py-4">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel for="name">Name</FormLabel>
                <FormControl>
                  <Input id="name" placeholder="John Doe" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel for="email">Email</FormLabel>
                <FormControl>
                  <Input id="email" type="email" placeholder="john@example.com" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="role">
              <FormItem>
                <FormLabel for="role">Role</FormLabel>
                <FormControl>
                  <select
                    id="role"
                    v-bind="componentField"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="status">
              <FormItem>
                <FormLabel for="status">Status</FormLabel>
                <FormControl>
                  <select
                    id="status"
                    v-bind="componentField"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" @click="isDialogOpen = false">Cancel</Button>
            <Button type="submit" :disabled="form.isSubmitting.value">
              {{ form.isSubmitting.value ? 'Saving...' : (editingUser ? 'Update' : 'Create') }}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <AlertDialog v-model:open="isDeleteDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user account.
            To confirm, please type <span class="font-bold text-destructive">SUPPRIMER</span> below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div class="py-4">
          <Input
            v-model="deleteConfirmationText"
            placeholder="Type SUPPRIMER to confirm"
            @input="updateDeleteConfirmation($event.target.value)"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel @click="cancelDelete">Cancel</AlertDialogCancel>
          <AlertDialogAction
            :disabled="!canConfirmDelete"
            @click="confirmDelete"
            class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete User
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <Card>
      <CardHeader>
        <CardTitle>Workflow Features</CardTitle>
      </CardHeader>
      <CardContent class="space-y-2 text-sm text-muted-foreground">
        <p>✓ Create new users with form validation</p>
        <p>✓ Read and display users in a table</p>
        <p>✓ Update existing user information</p>
        <p>✓ Delete users with confirmation</p>
        <p>✓ Sonner toast notifications for all actions</p>
        <p>✓ Pinia store for state management</p>
      </CardContent>
    </Card>
  </div>
</template>
