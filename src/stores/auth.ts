import { defineStore } from 'pinia'
import { ref } from 'vue'

const AUTH_STORAGE_KEY = 'tilvest_auth_state'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<{ email: string; name: string } | null>(null)

  // Charger l'état depuis localStorage au démarrage
  function loadAuthState() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        isAuthenticated.value = data.isAuthenticated || false
        user.value = data.user || null
      }
    } catch {
      // Ignorer les erreurs de parsing
    }
  }

  // Sauvegarder l'état dans localStorage
  function saveAuthState() {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
      isAuthenticated: isAuthenticated.value,
      user: user.value,
    }))
  }

  async function login(email: string, _password: string) {
    // Mock authentication - toujours succès
    user.value = { email, name: email.split('@')[0] ?? 'User' }
    isAuthenticated.value = true
    saveAuthState()
    return true
  }

  function logout() {
    isAuthenticated.value = false
    user.value = null
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem('tilvest_auth')
  }

  // Charger l'état au démarrage
  loadAuthState()

  return { isAuthenticated, user, login, logout }
})
