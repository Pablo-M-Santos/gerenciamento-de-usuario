import { defineStore } from 'pinia'

interface Usuario {
  usuario: string
  senha: string
  tipo: number
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as Usuario | null,
  }),
  actions: {
    setUser(user: Usuario) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
    initializeUser() {
      const user = JSON.parse(localStorage.getItem('user') || 'null')
      if (user) {
        this.setUser(user)
      }
    },
  },
  getters: {
    Comum: (state) => state.user?.tipo === 2,
    getUser: (state) => state.user,
  }
})
