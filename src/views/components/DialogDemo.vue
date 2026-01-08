<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'vue-sonner'

const isOpen = ref(false)
const confirmOpen = ref(false)
const emailValue = ref('')

function handleSubmit() {
  toast.success('Form submitted successfully!')
  isOpen.value = false
}

function handleDelete() {
  toast.success('Item deleted!')
  confirmOpen.value = false
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">Dialog</h1>
      <p class="text-muted-foreground">
        A modal dialog that captures user attention and focus
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Simple Dialog</CardTitle>
          <CardDescription>Basic dialog with title and description</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog v-model:open="isOpen">
            <DialogTrigger as-child>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" @click="isOpen = false">Cancel</Button>
                <Button @click="isOpen = false">Continue</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dialog with Form</CardTitle>
          <CardDescription>Dialog containing a form</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog v-model:open="isOpen">
            <DialogTrigger as-child>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="email" class="text-right">Email</Label>
                  <Input
                    id="email"
                    v-model="emailValue"
                    class="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" @click="isOpen = false">Cancel</Button>
                <Button @click="handleSubmit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Confirm Dialog</CardTitle>
          <CardDescription>Danger action with confirmation</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog v-model:open="confirmOpen">
            <DialogTrigger as-child>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete your account? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" @click="confirmOpen = false">Cancel</Button>
                <Button variant="destructive" @click="handleDelete">Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Usage Example</CardTitle>
        <CardDescription>How to use Dialog in your components</CardDescription>
      </CardHeader>
      <CardContent>
        <pre class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;Dialog v-model:open="isOpen"&gt;
  &lt;DialogTrigger as-child&gt;
    &lt;Button variant="outline"&gt;Open&lt;/Button&gt;
  &lt;/DialogTrigger&gt;
  &lt;DialogContent&gt;
    &lt;DialogHeader&gt;
      &lt;DialogTitle&gt;Title&lt;/DialogTitle&gt;
      &lt;DialogDescription&gt;Description&lt;/DialogDescription&gt;
    &lt;/DialogHeader&gt;
    &lt;DialogFooter&gt;
      &lt;Button variant="outline"&gt;Cancel&lt;/Button&gt;
      &lt;Button&gt;Confirm&lt;/Button&gt;
    &lt;/DialogFooter&gt;
  &lt;/DialogContent&gt;
&lt;/Dialog&gt;</code></pre>
      </CardContent>
    </Card>
  </div>
</template>
