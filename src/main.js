import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useUserStore } from './store/user'
import './style.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia).use(router)

useUserStore().loadFromStorage()
app.mount('#app')
