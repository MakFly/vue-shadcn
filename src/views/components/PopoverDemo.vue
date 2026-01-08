<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const inputValue = ref('')
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">Popover</h1>
      <p class="text-muted-foreground">
        Display rich content in a popover, powered by Radix Vue
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Basic Popover</CardTitle>
          <CardDescription>Simple popover with text content</CardDescription>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent class="w-56">
              <p class="text-sm">This is a simple popover with some text content.</p>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Popover with Input</CardTitle>
          <CardDescription>Popover with form elements</CardDescription>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline">Edit Profile</Button>
            </PopoverTrigger>
            <PopoverContent class="w-80">
              <div class="grid gap-4">
                <div class="space-y-2">
                  <h4 class="font-medium leading-none">Edit Profile</h4>
                  <p class="text-sm text-muted-foreground">
                    Make changes to your profile here. Click save when you're done.
                  </p>
                </div>
                <div class="grid gap-2">
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="width">Name</Label>
                    <Input
                      id="width"
                      v-model="inputValue"
                      class="col-span-2 h-8"
                    />
                  </div>
                </div>
                <Button class="w-full" size="sm">Save changes</Button>
              </div>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Popover Variants</CardTitle>
          <CardDescription>Different popover placements</CardDescription>
        </CardHeader>
        <CardContent class="flex gap-2 flex-wrap">
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline" size="sm">Top</Button>
            </PopoverTrigger>
            <PopoverContent side="top" class="w-48">
              <p class="text-sm">Popover on top</p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline" size="sm">Right</Button>
            </PopoverTrigger>
            <PopoverContent side="right" class="w-48">
              <p class="text-sm">Popover on right</p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline" size="sm">Bottom</Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" class="w-48">
              <p class="text-sm">Popover on bottom</p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline" size="sm">Left</Button>
            </PopoverTrigger>
            <PopoverContent side="left" class="w-48">
              <p class="text-sm">Popover on left</p>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Usage Example</CardTitle>
        <CardDescription>How to use Popover in your components</CardDescription>
      </CardHeader>
      <CardContent>
        <pre class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;Popover&gt;
  &lt;PopoverTrigger as-child&gt;
    &lt;Button variant="outline"&gt;Open&lt;/Button&gt;
  &lt;/PopoverTrigger&gt;
  &lt;PopoverContent&gt;
    &lt;p&gt;Your content here&lt;/p&gt;
  &lt;/PopoverContent&gt;
&lt;/Popover&gt;</code></pre>
      </CardContent>
    </Card>
  </div>
</template>
