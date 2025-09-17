import axios from 'axios'
import { useUserStore } from '../store/user'

// Usa .env.development si quieres cambiar la URL
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  timeout: 20000,
})
// Agrega Authorization: Bearer <token>
http.interceptors.request.use(async (config) => {
  const user = useUserStore()
  if (user.token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${user.token}`
  }
  console.log(config)
  return config
})

// Maneja 401 y limpia sesión
http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      const user = useUserStore()
      user.clear()
      // opcional: redirigir al login
      // window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)
export default http