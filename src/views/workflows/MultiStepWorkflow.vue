<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFormWorkflowStore } from '@/stores/formWorkflow'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { toast } from 'vue-sonner'

const workflow = useFormWorkflowStore()

const progress = computed(() => {
  return (workflow.currentStep / 3) * 100
})

const step1 = computed(() => workflow.formData.step1 || { firstName: '', lastName: '', email: '' })
const step2 = computed(() => workflow.formData.step2 || { address: '', city: '', zipCode: '' })
const step3 = computed(() => workflow.formData.step3 || { paymentMethod: '', terms: false })

const step1Errors = ref<Record<string, string[]>>({})
const step2Errors = ref<Record<string, string[]>>({})
const step3Errors = ref<Record<string, string[]>>({})

const step1Schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
})

const step2Schema = z.object({
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid zip code'),
})

const step3Schema = z.object({
  paymentMethod: z.enum(['credit-card', 'paypal', 'bank-transfer'], {
    required_error: 'Please select a payment method',
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
})

function validateStep1() {
  const result = step1Schema.safeParse(step1.value)
  if (result.success) {
    step1Errors.value = {}
    return true
  } else {
    step1Errors.value = result.error.formErrors.fieldErrors
    toast.error('Please fix the validation errors')
    return false
  }
}

function validateStep2() {
  const result = step2Schema.safeParse(step2.value)
  if (result.success) {
    step2Errors.value = {}
    return true
  } else {
    step2Errors.value = result.error.formErrors.fieldErrors
    toast.error('Please fix the validation errors')
    return false
  }
}

function validateStep3() {
  const result = step3Schema.safeParse(step3.value)
  if (result.success) {
    step3Errors.value = {}
    return true
  } else {
    step3Errors.value = result.error.formErrors.fieldErrors
    toast.error('Please fix the validation errors')
    return false
  }
}

function saveStep1() {
  if (!validateStep1()) return
  workflow.updateStepData(1, step1.value)
  workflow.nextStep()
}

function saveStep2() {
  if (!validateStep2()) return
  workflow.updateStepData(2, step2.value)
  workflow.nextStep()
}

function saveStep3() {
  if (!validateStep3()) return
  workflow.updateStepData(3, step3.value)
  workflow.submitForm()
}

function reset() {
  workflow.reset()
  step1Errors.value = {}
  step2Errors.value = {}
  step3Errors.value = {}
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">Multi-Step Form Workflow</h1>
      <p class="text-muted-foreground">
        Multi-step form with Pinia store state management and progress tracking
      </p>
    </div>

    <Card v-if="!workflow.isComplete">
      <CardHeader>
        <CardTitle>Step {{ workflow.currentStep }} of 3</CardTitle>
        <CardDescription>Complete all steps to submit the form</CardDescription>
        <Progress :model-value="progress" class="mt-4" />
      </CardHeader>
      <CardContent>
        <!-- Step 1: Personal Information -->
        <div v-if="workflow.currentStep === 1" class="space-y-4">
          <h3 class="text-lg font-semibold">Personal Information</h3>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="firstName">First Name</Label>
              <Input
                id="firstName"
                v-model="step1.firstName"
                placeholder="John"
                @input="workflow.updateStepData(1, step1)"
              />
              <p v-if="step1Errors.firstName" class="text-sm text-destructive">{{ step1Errors.firstName[0] }}</p>
            </div>
            <div class="grid gap-2">
              <Label for="lastName">Last Name</Label>
              <Input
                id="lastName"
                v-model="step1.lastName"
                placeholder="Doe"
                @input="workflow.updateStepData(1, step1)"
              />
              <p v-if="step1Errors.lastName" class="text-sm text-destructive">{{ step1Errors.lastName[0] }}</p>
            </div>
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                v-model="step1.email"
                type="email"
                placeholder="john@example.com"
                @input="workflow.updateStepData(1, step1)"
              />
              <p v-if="step1Errors.email" class="text-sm text-destructive">{{ step1Errors.email[0] }}</p>
            </div>
          </div>
        </div>

        <!-- Step 2: Address -->
        <div v-if="workflow.currentStep === 2" class="space-y-4">
          <h3 class="text-lg font-semibold">Address Information</h3>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="address">Address</Label>
              <Input
                id="address"
                v-model="step2.address"
                placeholder="123 Main St"
                @input="workflow.updateStepData(2, step2)"
              />
              <p v-if="step2Errors.address" class="text-sm text-destructive">{{ step2Errors.address[0] }}</p>
            </div>
            <div class="grid gap-2">
              <Label for="city">City</Label>
              <Input
                id="city"
                v-model="step2.city"
                placeholder="New York"
                @input="workflow.updateStepData(2, step2)"
              />
              <p v-if="step2Errors.city" class="text-sm text-destructive">{{ step2Errors.city[0] }}</p>
            </div>
            <div class="grid gap-2">
              <Label for="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                v-model="step2.zipCode"
                placeholder="10001"
                @input="workflow.updateStepData(2, step2)"
              />
              <p v-if="step2Errors.zipCode" class="text-sm text-destructive">{{ step2Errors.zipCode[0] }}</p>
            </div>
          </div>
        </div>

        <!-- Step 3: Payment -->
        <div v-if="workflow.currentStep === 3" class="space-y-4">
          <h3 class="text-lg font-semibold">Payment Method</h3>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="paymentMethod">Payment Method</Label>
              <select
                id="paymentMethod"
                v-model="step3.paymentMethod"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                @change="workflow.updateStepData(3, step3)"
              >
                <option value="">Select a method</option>
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank-transfer">Bank Transfer</option>
              </select>
              <p v-if="step3Errors.paymentMethod" class="text-sm text-destructive">{{ step3Errors.paymentMethod[0] }}</p>
            </div>
            <div class="flex items-center gap-2">
              <input
                id="terms"
                type="checkbox"
                v-model="step3.terms"
                @change="workflow.updateStepData(3, step3)"
                class="h-4 w-4 rounded"
              />
              <Label for="terms" class="text-sm">I accept the terms and conditions</Label>
            </div>
            <p v-if="step3Errors.terms" class="text-sm text-destructive">{{ step3Errors.terms[0] }}</p>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-6">
          <Button
            v-if="workflow.currentStep > 1"
            variant="outline"
            @click="workflow.previousStep()"
          >
            Previous
          </Button>
          <div v-else></div>

          <Button v-if="workflow.currentStep < 3" @click="workflow.currentStep === 1 ? saveStep1() : saveStep2()">
            Next
          </Button>
          <Button v-else @click="saveStep3()">
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Complete State -->
    <Card v-else>
      <CardHeader>
        <CardTitle class="text-green-600">Form Submitted Successfully!</CardTitle>
        <CardDescription>Your information has been received.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="bg-muted p-4 rounded-lg">
          <h4 class="font-semibold mb-2">Summary:</h4>
          <div class="space-y-2 text-sm">
            <p><strong>Name:</strong> {{ workflow.formData.step1?.firstName }} {{ workflow.formData.step1?.lastName }}</p>
            <p><strong>Email:</strong> {{ workflow.formData.step1?.email }}</p>
            <p><strong>Address:</strong> {{ workflow.formData.step2?.address }}, {{ workflow.formData.step2?.city }}</p>
            <p><strong>Payment:</strong> {{ workflow.formData.step3?.paymentMethod }}</p>
          </div>
        </div>
        <Button @click="reset">Start New Form</Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Workflow Features</CardTitle>
      </CardHeader>
      <CardContent class="space-y-2 text-sm text-muted-foreground">
        <p>✓ Multi-step form with progress tracking</p>
        <p>✓ Pinia store for global state management</p>
        <p>✓ Form data persisted between steps</p>
        <p>✓ Validation at each step</p>
        <p>✓ Success notification on completion</p>
        <p>✓ Summary view after submission</p>
      </CardContent>
    </Card>
  </div>
</template>
