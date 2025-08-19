<script setup>
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import {
  Heart, Activity, BarChart3, History, FileText, Download,
  Home, X, LogOut, UserCog
} from 'lucide-vue-next'
import { useUserStore } from '../store/user'

// Props y emits
const props = defineProps({
  open: { type: Boolean, default: false },
  logoSrc: { type: String, default: '' },
})
const emit = defineEmits(['close'])

const route = useRoute()
const router = useRouter()
const user = useUserStore()

const roleLabelMap = {
  OPERATOR: 'Personal de Farmacia',
  ADMIN: 'Responsable de Farmacia',
  CONSULTANT: 'Personal de adquisiciones',
  SUPERUSER: 'Unidad de Sistemas',
}

const nav = computed(() => {
  const r = user.role
  const all = [
    { name: 'Dashboard',         to: '/dashboard',      icon: Home,      roles: ['ADMIN','SUPERUSER','OPERATOR','CONSULTANT'] },
    { name: 'Predicciones',      to: '/predicciones',   icon: BarChart3, roles: ['ADMIN','SUPERUSER','OPERATOR','CONSULTANT'] },
    { name: 'Históricos',        to: '/historicos',     icon: History,   roles: ['ADMIN','SUPERUSER','OPERATOR','CONSULTANT'] },
    { name: 'Reportes',          to: '/reportes',       icon: FileText,  roles: ['ADMIN','SUPERUSER','OPERATOR','CONSULTANT'] },
    { name: 'Descargas',         to: '/descargas',      icon: Download,  roles: ['ADMIN','SUPERUSER','OPERATOR','CONSULTANT'] },
    { name: 'Gestión de usuarios', to: '/admin/usuarios', icon: UserCog, roles: ['ADMIN','SUPERUSER'] },
  ]
  return all.filter(i => !i.roles || i.roles.includes(r))
})

const isActive = (to) => route.path === to || route.path.startsWith(to + '/')
const close = () => emit('close')
const logout = () => { user.logout(); router.push('/login'); emit('close') }
const initials = computed(() => (user.email ? user.email.substring(0,2).toUpperCase() : 'US'))
</script>

<template>
  <!-- Overlay (mobile) -->
  <div v-if="open" class="fixed inset-0 z-40 bg-black/50 lg:hidden" @click="close" />

  <!-- Sidebar -->
  <aside
    class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >

    <div class="flex flex-col h-full py-4">
      <!-- Header -->
      <div class="flex items-center justify-between p-5 border-b border-gray-200">
        <div class="flex flex-col items-center space-x-3">
          <div v-if="logoSrc" class="w-20 h-20 rounded-full p-0.5 overflow-hidden bg-white ring-1 ring-red-100">
            <img :src="logoSrc" alt="logo" class="w-full h-full object-contain" />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900 text-center">Hospital Municipal Modelo Corea</h2>
            <p class="text-xs text-gray-500 text-center">Sistema de Análisis Predictivo de Medicamentos</p>
          </div>
        </div>
        <button class="lg:hidden p-2 rounded hover:bg-gray-100" @click="close" aria-label="Cerrar menú">
          <X class="h-4 w-4" />
        </button>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group hover:scale-[1.02]"
          :class="isActive(item.to)
            ? 'bg-red-50 text-red-700 border-l-4 border-red-600'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
          @click="close"
        >
          <component
            :is="item.icon"
            class="h-5 w-5 transition-colors"
            :class="isActive(item.to) ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'"
          />
          <span>{{ item.name }}</span>
        </RouterLink>
      </nav>

      <!-- User -->
      <div class="p-4 border-t border-gray-200 flex items-center justify-around ">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-sm font-medium text-blue-700">{{ initials }}</span>
          </div>
        </div>
        <div class="mb-3">
          <p class="text-sm font-medium text-gray-900 truncate">{{ user.email }}</p>
          <p class="text-xs text-gray-500 truncate">{{ roleLabelMap[user.role] || user.role }}</p>
        </div>
      </div>
      <div>
        
      </div>
      <div class="px-3">
          <button
            class=" w-full flex text-center items-center bg-red-600 text-white font-semibold  hover:text-gray-900 hover:bg-gray-50 px-5 py-2 rounded"
            @click="logout">
              <LogOut class="h-4 w-4 mr-2" />
              Cerrar sesión
          </button>
      </div>
    </div>
  </aside>
</template>
