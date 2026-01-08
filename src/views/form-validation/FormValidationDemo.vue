<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  bio: z.string().min(10).max(200),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  toast.success('Form submitted successfully!')
  console.log('Form values:', values)
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">Form Validation</h1>
      <p class="text-muted-foreground">
        Client-side form validation with vee-validate and zod
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <Card class="md:col-span-2">
        <CardHeader>
          <CardTitle>Registration Form</CardTitle>
          <CardDescription>
            A complete form with validation using zod schemas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit="onSubmit" class="space-y-6 max-w-md">
            <FormField v-slot="{ componentField }" name="username">
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your username" v-bind="componentField" />
                </FormControl>
                <FormDescription>
                  Your username must be between 2 and 50 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" v-bind="componentField" />
                </FormControl>
                <FormDescription>
                  We'll send you a confirmation email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="bio">
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Tell us about yourself" v-bind="componentField" />
                </FormControl>
                <FormDescription>
                  A short bio (10-200 characters).
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="acceptTerms">
              <FormItem class="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <input
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300"
                    v-bind="componentField"
                  />
                </FormControl>
                <div class="space-y-1 leading-none">
                  <FormLabel>
                    Accept terms and conditions
                  </FormLabel>
                  <FormDescription>
                    You must accept our terms to continue.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>

            <Button type="submit" :disabled="form.isSubmitting.value">
              {{ form.isSubmitting.value ? 'Submitting...' : 'Submit' }}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card class="md:col-span-2">
        <CardHeader>
          <CardTitle>Zod Schema Example</CardTitle>
          <CardDescription>The validation schema used in this form</CardDescription>
        </CardHeader>
        <CardContent>
          <pre class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>import { z } from 'zod'

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  bio: z.string().min(10).max(200),
  acceptTerms: z.boolean().refine(
    (val) => val === true,
    { message: 'You must accept the terms' }
  ),
})</code></pre>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
