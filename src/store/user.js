import { defineStore } from 'pinia'
import http from '../api/http'

// helper: decodificar payload del JWT (sin verificar firma)
function decodeJwtPayload (token) {
  try {
    const base64Url = token.split('.')[1]
    const json = atob(base64Url.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decodeURIComponent(escape(json)))
  } catch {
    return {}
  }
}

export const useUserStore = defineStore('user', {
  state: () => ({
    // TEMPORALMENTE SIMULANDO USUARIO AUTENTICADO PARA DESARROLLO
    token: 'fake-token-for-development',
    email: 'usuario@ejemplo.com',
    role: 'ADMIN',
  }),
  getters: {
    isAuthenticated: (s) => !!s.token,
  },
  actions: {
    setToken(tok) {
      this.token = tok
      localStorage.setItem('token', tok)
      // cargar info desde el payload del JWT (tu backend pone sub y role)
      const payload = decodeJwtPayload(tok)
      this.email = payload.sub || null
      this.role  = payload.role || null
      if (this.email) localStorage.setItem('email', this.email)
      if (this.role)  localStorage.setItem('role', this.role)
      // header para próximas llamadas
      http.defaults.headers.common.Authorization = `Bearer ${tok}`
    },
    loadFromStorage() {
      if (this.token) {
        http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      }
    },
    logout() {
      this.token = this.email = this.role = null
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('role')
      delete http.defaults.headers.common.Authorization
    },
  },
})
