<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { FieldGroup, FieldLabel, FieldDescription, FieldSeparator } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue-sonner'

const props = defineProps<{
  class?: string
}>()

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Récupérer le redirectTo depuis l'URL
const redirectTo = (route.query.redirectTo as string) || '/dashboard'

// Schéma de validation Zod
const loginSchema = toTypedSchema(
  z.object({
    email: z
      .string({
        required_error: 'Email est requis',
      })
      .min(1, 'Email est requis')
      .email('Email invalide'),
    password: z
      .string({
        required_error: 'Mot de passe est requis',
      })
      .min(1, 'Mot de passe est requis')
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  }),
)

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: loginSchema,
})

// Créer les champs avec useField pour avoir accès aux valeurs et erreurs
const { value: emailValue, errorMessage: emailError } = useField<string>('email')
const { value: passwordValue, errorMessage: passwordError } = useField<string>('password')

// Fonction d'autofill depuis localStorage
function handleAutofill() {
  const storedAuth = localStorage.getItem('tilvest_auth')
  if (storedAuth) {
    try {
      const authData = JSON.parse(storedAuth)
      emailValue.value = authData.email || 'demo@example.com'
      passwordValue.value = authData.password || 'password123'
      toast.success('Autofill depuis localStorage!')
    } catch {
      emailValue.value = 'demo@example.com'
      passwordValue.value = 'password123'
      toast.info('Autofill avec les valeurs par défaut!')
    }
  } else {
    emailValue.value = 'demo@example.com'
    passwordValue.value = 'password123'
    toast.info('Autofill avec les valeurs par défaut!')
  }
}

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login(values.email, values.password)

    // Sauvegarder dans localStorage pour l'autofill
    localStorage.setItem('tilvest_auth', JSON.stringify({
      email: values.email,
      password: values.password,
      timestamp: Date.now(),
    }))

    toast.success('Connexion réussie!')
    router.push(redirectTo)
  } catch (error) {
    toast.error('Erreur lors de la connexion')
  }
})
</script>

<template>
  <form :class="cn('flex flex-col gap-6', props.class)" @submit="onSubmit">
    <FieldGroup>
      <div class="flex flex-col items-center gap-1 text-center">
        <h1 class="text-2xl font-bold">
          Login to your account
        </h1>
        <p class="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <FieldLabel for="email">
          Email
        </FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          v-model="emailValue"
          class="h-11"
        />
        <p v-if="emailError" class="text-destructive text-sm font-normal">
          {{ emailError }}
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex items-center">
          <FieldLabel for="password">
            Password
          </FieldLabel>
          <a
            href="#"
            class="ml-auto text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          v-model="passwordValue"
          class="h-11"
        />
        <p v-if="passwordError" class="text-destructive text-sm font-normal">
          {{ passwordError }}
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <Button type="submit" :disabled="isSubmitting" pointer size="lg" class="w-full">
          <span v-if="!isSubmitting">Login</span>
          <span v-else>Connexion...</span>
        </Button>

        <Button type="button" variant="outline" size="lg" class="w-full" @click="handleAutofill">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="mr-2 h-4 w-4">
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Autofill (Demo)
        </Button>
      </div>

      <FieldSeparator>Or continue with</FieldSeparator>

      <Field>
        <Button variant="outline" type="button" size="lg" class="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="mr-2 h-4 w-4">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button>
        <FieldDescription class="text-center">
          Don't have an account?
          <a href="#">Sign up</a>
        </FieldDescription>
      </Field>
    </FieldGroup>
  </form>
</template>
