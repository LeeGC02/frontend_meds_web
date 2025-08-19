import axios from 'axios'

// Usa .env.development si quieres cambiar la URL
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  timeout: 20000,
})

export default http