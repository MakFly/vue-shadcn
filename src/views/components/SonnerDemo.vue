<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'vue-sonner'

function showSuccess() {
  toast.success('Operation completed successfully!')
}

function showError() {
  toast.error('Something went wrong. Please try again.')
}

function showInfo() {
  toast.info('Here is some information for you.')
}

function showWarning() {
  toast.warning('This is a warning message.')
}

function showPromise() {
  toast.promise(
    new Promise((resolve) => setTimeout(resolve, 2000)),
    {
      loading: 'Loading...',
      success: 'Done!',
      error: 'Error!'
    }
  )
}

function showCustom() {
  toast('Custom toast with action', {
    action: {
      label: 'Undo',
      onClick: () => console.log('Undo')
    }
  })
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">Sonner - Toast Notifications</h1>
      <p class="text-muted-foreground">
        Beautiful toast notifications built with vue-sonner
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Basic Toasts</CardTitle>
          <CardDescription>Simple notification examples</CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <Button @click="showSuccess" variant="default" class="w-full">Success Toast</Button>
          <Button @click="showError" variant="destructive" class="w-full">Error Toast</Button>
          <Button @click="showInfo" variant="secondary" class="w-full">Info Toast</Button>
          <Button @click="showWarning" variant="outline" class="w-full">Warning Toast</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Promise Toast</CardTitle>
          <CardDescription>Async operation with loading state</CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <Button @click="showPromise" variant="default" class="w-full">Show Promise</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Toast</CardTitle>
          <CardDescription>Toast with custom action</CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <Button @click="showCustom" variant="default" class="w-full">Custom Action</Button>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Usage Example</CardTitle>
        <CardDescription>How to use Sonner in your components</CardDescription>
      </CardHeader>
      <CardContent>
        <pre class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>import { toast } from 'vue-sonner'

// Success
toast.success('Operation completed!')

// Error
toast.error('Something went wrong!')

// Promise
toast.promise(
  apiCall(),
  {
    loading: 'Loading...',
    success: 'Done!',
    error: 'Error!'
  }
)</code></pre>
      </CardContent>
    </Card>
  </div>
</template>
