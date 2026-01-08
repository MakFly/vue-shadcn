<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const navigationBubbles = ref([
  { section: 'Dashboards', items: [
    { name: 'Dashboard', path: '/dashboard', icon: '📊', color: 'from-blue-500 to-cyan-500' },
    { name: 'Users', path: '/users', icon: '👥', color: 'from-purple-500 to-pink-500' },
    { name: 'Products', path: '/products', icon: '📦', color: 'from-orange-500 to-red-500' }
  ]},
  { section: 'Components', items: [
    { name: 'Sonner', path: '/components/sonner', icon: '🔔', color: 'from-green-500 to-emerald-500' },
    { name: 'Popover', path: '/components/popover', icon: '💬', color: 'from-yellow-500 to-orange-500' },
    { name: 'Dialog', path: '/components/dialog', icon: '🪟', color: 'from-indigo-500 to-purple-500' },
    { name: 'Input Group', path: '/components/input-group', icon: '⌨️', color: 'from-teal-500 to-cyan-500' }
  ]},
  { section: 'Forms & Workflows', items: [
    { name: 'Form Validation', path: '/form-validation', icon: '✅', color: 'from-rose-500 to-pink-500' },
    { name: 'CRUD Workflow', path: '/workflows/crud', icon: '🔄', color: 'from-violet-500 to-purple-500' },
    { name: 'Multi-Step', path: '/workflows/multi-step', icon: '📝', color: 'from-sky-500 to-blue-500' },
    { name: 'Cart', path: '/workflows/cart', icon: '🛒', color: 'from-amber-500 to-yellow-500' }
  ]}
])

const testimonials = ref([
  {
    quote: "The combination of shadcn's component philosophy with Vue's reactivity is absolute magic. My dev velocity has never been higher.",
    author: "Sarah Chen",
    role: "Senior Frontend Engineer",
    company: "Vercel"
  },
  {
    quote: "Finally, accessible components that don't fight against Vue's composition API. This is how component libraries should work.",
    author: "Marcus Rodriguez",
    role: "Tech Lead",
    company: "Stripe"
  },
  {
    quote: "Type-first development with full tree-shaking? Yes please. Our bundle sizes dropped 40% after migrating.",
    author: "Yuki Tanaka",
    role: "Staff Engineer",
    company: "Linear"
  }
])

const features = ref([
  {
    title: "Copy & Paste",
    description: "Own your components. Full control. No dependencies to fight against.",
    icon: "⚡"
  },
  {
    title: "Built on Radix Vue",
    description: "Unstyled, accessible components with excellent Vue 3 Composition API support.",
    icon: "◈"
  },
  {
    title: "Themed by Default",
    description: "Comprehensive theming system with CSS variables for endless customization.",
    icon: "🎨"
  },
  {
    title: "TypeScript First",
    description: "Written in TypeScript with full type safety and excellent DX.",
    icon: "🔷"
  },
  {
    title: "Dark Mode Ready",
    description: "Built-in dark mode support that just works out of the box.",
    icon: "◑"
  },
  {
    title: "Responsive",
    description: "Components that adapt beautifully to any screen size.",
    icon: "⊞"
  }
])

onMounted(() => {
  // Trigger animations on mount
  requestAnimationFrame(() => {
    document.querySelectorAll('.animate-on-mount').forEach((el, index) => {
      setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-y-8')
        el.classList.add('opacity-100', 'translate-y-0')
      }, index * 100)
    })
  })
})
</script>

<template>
  <div class="min-h-screen bg-[#0A0A0B] text-white overflow-hidden">
    <!-- Background Grid Pattern -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0B]/50 to-[#0A0A0B]"></div>
    </div>

    <!-- Floating Orbs -->
    <div class="fixed top-20 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="fixed bottom-20 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10">
      <!-- Hero Section -->
      <section class="min-h-screen flex items-center justify-center px-6 py-20">
        <div class="max-w-6xl mx-auto text-center">
          <div class="animate-on-mount opacity-0 translate-y-8 transition-all duration-700 ease-out">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span class="text-sm text-gray-300 font-medium tracking-wide">Now with Vue 3 Support</span>
            </div>
          </div>

          <h1 class="animate-on-mount opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out font-['Syne'] text-6xl md:text-8xl font-bold leading-none mb-6">
            <span class="block text-white">Beautifully</span>
            <span class="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Crafted Components
            </span>
          </h1>

          <p class="animate-on-mount opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Build stunning interfaces with Vue. shadcn brings you accessible, customizable components built with Radix Vue and Tailwind CSS.
          </p>

          <div class="animate-on-mount opacity-0 translate-y-8 transition-all duration-700 delay-300 ease-out flex flex-col sm:flex-row gap-4 justify-center items-center">
            <RouterLink to="/dashboard">
              <Button size="lg" class="bg-white text-black hover:bg-gray-100 px-8 py-6 text-base font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-white/10">
                Get Started Free
              </Button>
            </RouterLink>
            <RouterLink to="/components">
              <Button size="lg" variant="outline" class="bg-transparent border-white/20 text-white hover:bg-white/5 hover:text-white px-8 py-6 text-base font-medium rounded-full transition-all duration-300">
                View Components
              </Button>
            </RouterLink>
          </div>

          <!-- Stats -->
          <div class="animate-on-mount opacity-0 translate-y-8 transition-all duration-700 delay-500 ease-out grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-white mb-2 font-['Syne']">40+</div>
              <div class="text-sm text-gray-500 uppercase tracking-wider">Components</div>
            </div>
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-white mb-2 font-['Syne']">100K</div>
              <div class="text-sm text-gray-500 uppercase tracking-wider">GitHub Stars</div>
            </div>
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-white mb-2 font-['Syne']">1M+</div>
              <div class="text-sm text-gray-500 uppercase tracking-wider">Installations</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bubble Navigation Section -->
      <section class="py-20 px-6 relative">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <span class="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-4 block">Explore Examples</span>
            <h2 class="text-4xl md:text-5xl font-bold text-white font-['Syne'] mb-6">
              Jump to any demo
            </h2>
            <p class="text-xl text-gray-400 max-w-2xl mx-auto">
              Interactive examples showcasing shadcn components with Vue 3, Pinia, and TanStack Table.
            </p>
          </div>

          <!-- Bubbles Grid -->
          <div class="space-y-12">
            <div v-for="section in navigationBubbles" :key="section.section">
              <h3 class="text-xl font-semibold text-gray-300 mb-6 flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
                {{ section.section }}
              </h3>
              <div class="flex flex-wrap gap-4 justify-center">
                <RouterLink
                  v-for="item in section.items"
                  :key="item.path"
                  :to="item.path"
                  class="group relative"
                >
                  <div class="absolute inset-0 bg-gradient-to-r blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                       :class="item.color">
                  </div>
                  <div class="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl px-6 py-5
                              hover:bg-white/10 hover:border-white/20 transition-all duration-300
                              hover:scale-105 hover:-translate-y-1 min-w-[160px]">
                    <div class="flex flex-col items-center gap-3">
                      <div class="text-4xl group-hover:scale-110 transition-transform duration-300">
                        {{ item.icon }}
                      </div>
                      <div class="text-center">
                        <div class="font-semibold text-white text-base">{{ item.name }}</div>
                        <div class="text-xs text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">
                          View demo →
                        </div>
                      </div>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- Quick Access Buttons -->
          <div class="mt-16 flex flex-wrap justify-center gap-4">
            <RouterLink to="/dashboard">
              <Button size="lg" class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600
                                  text-white px-8 py-6 rounded-full font-medium transition-all duration-300
                                  hover:scale-105 shadow-2xl shadow-cyan-500/20">
                📊 View Dashboard
              </Button>
            </RouterLink>
            <RouterLink to="/workflows/cart">
              <Button size="lg" variant="outline" class="border-2 border-white/20 text-white hover:bg-white/5
                                              hover:border-white/30 px-8 py-6 rounded-full font-medium
                                              transition-all duration-300 hover:scale-105">
                🛒 Try Shopping Cart
              </Button>
            </RouterLink>
            <RouterLink to="/components">
              <Button size="lg" variant="outline" class="border-2 border-white/20 text-white hover:bg-white/5
                                              hover:border-white/30 px-8 py-6 rounded-full font-medium
                                              transition-all duration-300 hover:scale-105">
                🎨 All Components
              </Button>
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- Code Preview Section -->
      <section class="py-32 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1">
              <div class="relative">
                <!-- Window controls -->
                <div class="absolute -top-12 left-0 flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span class="ml-4 text-sm text-gray-500 font-mono">ComponentExample.vue</span>
                </div>

                <!-- Code block -->
                <div class="bg-[#111113] border border-white/10 rounded-xl p-6 overflow-x-auto">
                  <pre class="text-sm leading-relaxed"><code class="text-gray-300"><span class="text-purple-400">&lt;script setup</span> <span class="text-cyan-400">lang</span>=<span class="text-green-400">"ts"</span><span class="text-purple-400">&gt;</span>
<span class="text-purple-400">import</span> { Button } <span class="text-purple-400">from</span> <span class="text-green-400">'@/components/ui/button'</span>
<span class="text-purple-400">import</span> { Card } <span class="text-purple-400">from</span> <span class="text-green-400">'@/components/ui/card'</span>

<span class="text-gray-500">// Your component logic here</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-blue-400">&lt;Card</span> <span class="text-cyan-400">class</span>=<span class="text-green-400">"w-full"</span><span class="text-blue-400">&gt;</span>
    <span class="text-blue-400">&lt;CardHeader&gt;</span>
      <span class="text-blue-400">&lt;CardTitle&gt;</span>
        Beautiful Components
      <span class="text-blue-400">&lt;/CardTitle&gt;</span>
    <span class="text-blue-400">&lt;/CardHeader&gt;</span>
    <span class="text-blue-400">&lt;CardContent&gt;</span>
      <span class="text-blue-400">&lt;Button&gt;</span>Get Started<span class="text-blue-400">&lt;/Button&gt;</span>
    <span class="text-blue-400">&lt;/CardContent&gt;</span>
  <span class="text-blue-400">&lt;/Card&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
                </div>

                <!-- Glow effect -->
                <div class="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl -z-10"></div>
              </div>
            </div>

            <div class="order-1 lg:order-2">
              <span class="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-4 block">Developer Experience</span>
              <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 font-['Syne']">
                Code that feels <br/><span class="text-gray-500">like yours</span>
              </h2>
              <p class="text-xl text-gray-400 mb-8 leading-relaxed">
                Copy and paste into your project. Customize however you want. Full control over your components while maintaining consistency.
              </p>
              <ul class="space-y-4">
                <li class="flex items-center gap-3 text-gray-300">
                  <div class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-cyan-400"></div>
                  </div>
                  <span>TypeScript support out of the box</span>
                </li>
                <li class="flex items-center gap-3 text-gray-300">
                  <div class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-cyan-400"></div>
                  </div>
                  <span>Full control over component styling</span>
                </li>
                <li class="flex items-center gap-3 text-gray-300">
                  <div class="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-cyan-400"></div>
                  </div>
                  <span>Accessible by default with ARIA attributes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Grid -->
      <section class="py-32 px-6 relative">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-20">
            <span class="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-4 block">Why shadcn × Vue</span>
            <h2 class="text-4xl md:text-6xl font-bold text-white font-['Syne'] mb-6">
              Everything you need
            </h2>
            <p class="text-xl text-gray-400 max-w-2xl mx-auto">
              A complete component system that adapts to your needs. Build faster with confidence.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              v-for="(feature, index) in features"
              :key="index"
              class="bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 group"
            >
              <CardHeader>
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {{ feature.icon }}
                </div>
                <CardTitle class="text-xl text-white">{{ feature.title }}</CardTitle>
                <CardDescription class="text-gray-400 text-base">
                  {{ feature.description }}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="py-32 px-6 relative">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-20">
            <span class="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-4 block">Testimonials</span>
            <h2 class="text-4xl md:text-6xl font-bold text-white font-['Syne'] mb-6">
              Loved by developers
            </h2>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <Card
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="bg-gradient-to-b from-white/10 to-white/5 border-white/10"
            >
              <CardHeader>
                <div class="flex gap-1 mb-4">
                  <span v-for="i in 5" :key="i" class="text-yellow-500">★</span>
                </div>
                <CardDescription class="text-gray-300 text-lg leading-relaxed italic">
                  "{{ testimonial.quote }}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="font-semibold text-white">{{ testimonial.author }}</div>
                <div class="text-sm text-gray-500">{{ testimonial.role }}, {{ testimonial.company }}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-32 px-6 relative">
        <div class="max-w-4xl mx-auto text-center relative">
          <!-- Glow effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl -z-10"></div>

          <Card class="bg-gradient-to-b from-white/10 to-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader class="pb-8">
              <h2 class="text-4xl md:text-5xl font-bold text-white font-['Syne'] mb-6">
                Ready to build <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">something amazing?</span>
              </h2>
              <p class="text-xl text-gray-400 max-w-2xl mx-auto">
                Join thousands of developers building beautiful interfaces with shadcn × Vue.
              </p>
            </CardHeader>
            <CardContent class="flex flex-col sm:flex-row gap-4 justify-center">
              <RouterLink to="/workflows/crud" class="flex-1">
                <Button size="lg" class="w-full bg-white text-black hover:bg-gray-100 px-8 py-6 text-base font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-white/10">
                  Start Building Now
                </Button>
              </RouterLink>
              <RouterLink to="/form-validation" class="flex-1">
                <Button size="lg" variant="outline" class="w-full bg-transparent border-white/20 text-white hover:bg-white/5 hover:text-white px-8 py-6 text-base font-medium rounded-full transition-all duration-300">
                  See Form Validation
                </Button>
              </RouterLink>
            </CardContent>
          </Card>
        </div>
      </section>

      <!-- Footer -->
      <footer class="py-12 px-6 border-t border-white/10">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="text-gray-500 text-sm">
            © 2024 shadcn × Vue. Built with love for the Vue community.
          </div>
          <div class="flex gap-6">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">GitHub</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Twitter</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
