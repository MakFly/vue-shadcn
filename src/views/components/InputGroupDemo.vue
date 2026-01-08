<script setup lang="ts">
import { ArrowUpIcon, CheckIcon, InfoIcon, PlusIcon, Search } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold mb-2">Input Group</h1>
      <p class="text-muted-foreground">
        Compose inputs with addons, buttons, and text
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <Card class="md:col-span-2">
        <CardHeader>
          <CardTitle>Interactive Examples</CardTitle>
          <CardDescription>From the official shadcn-vue documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid w-full max-w-sm gap-6">
            <!-- Search input -->
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                12 results
              </InputGroupAddon>
            </InputGroup>

            <!-- URL input -->
            <InputGroup>
              <InputGroupInput placeholder="example.com" class="!pl-1" />
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <InputGroupButton class="rounded-full" size="icon-xs">
                        <InfoIcon class="size-4" />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>This is content in a tooltip.</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </InputGroupAddon>
            </InputGroup>

            <!-- Textarea with actions -->
            <InputGroup>
              <InputGroupTextarea placeholder="Ask, Search or Chat..." />
              <InputGroupAddon align="block-end">
                <InputGroupButton
                  variant="outline"
                  class="rounded-full"
                  size="icon-xs"
                >
                  <PlusIcon class="size-4" />
                </InputGroupButton>
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <InputGroupButton variant="ghost">
                      Auto
                    </InputGroupButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    align="start"
                    class="[--radius:0.95rem]"
                  >
                    <DropdownMenuItem>Auto</DropdownMenuItem>
                    <DropdownMenuItem>Agent</DropdownMenuItem>
                    <DropdownMenuItem>Manual</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <InputGroupText class="ml-auto">
                  52% used
                </InputGroupText>
                <Separator orientation="vertical" class="!h-4" />
                <InputGroupButton
                  variant="default"
                  class="rounded-full"
                  size="icon-xs"
                  disabled
                >
                  <ArrowUpIcon class="size-4" />
                  <span class="sr-only">Send</span>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>

            <!-- Username input with checkmark -->
            <InputGroup>
              <InputGroupInput placeholder="@shadcn" />
              <InputGroupAddon align="inline-end">
                <div class="flex items-center justify-center rounded-full bg-primary text-primary-foreground size-4">
                  <CheckIcon class="size-3" />
                </div>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>With Icons</CardTitle>
          <CardDescription>Input with icon prefix</CardDescription>
        </CardHeader>
        <CardContent>
          <InputGroup class="max-w-sm">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
          </InputGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>With Buttons</CardTitle>
          <CardDescription>Input with action buttons</CardDescription>
        </CardHeader>
        <CardContent>
          <InputGroup class="max-w-sm">
            <InputGroupInput placeholder="Enter email..." />
            <InputGroupAddon>
              <InputGroupButton size="sm">Subscribe</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Usage Example</CardTitle>
        <CardDescription>How to use InputGroup in your components</CardDescription>
      </CardHeader>
      <CardContent>
        <pre class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;InputGroup&gt;
  &lt;InputGroupInput placeholder="Search..." /&gt;
  &lt;InputGroupAddon&gt;
    &lt;Search /&gt;
  &lt;/InputGroupAddon&gt;
  &lt;InputGroupAddon align="inline-end"&gt;
    12 results
  &lt;/InputGroupAddon&gt;
&lt;/InputGroup&gt;</code></pre>
      </CardContent>
    </Card>
  </div>
</template>
