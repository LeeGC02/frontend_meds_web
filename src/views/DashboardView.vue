<script setup>
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'
const user = useUserStore()
const router = useRouter()

const logout = () => { user.logout(); router.push('/login') }
const canManage = ['ADMIN','SUPERUSER'].includes(user.role)
const goToAdmin = () => router.push('/admin/usuarios')
</script>

<template>
  <section class="p-6 space-y-4">
    <h1 class="text-2xl font-semibold">Dashboard</h1>
    <p class="text-gray-700">
      Bienvenido, <strong>{{ user.email }}</strong> (rol: {{ user.role }})
    </p>

    <div class="flex gap-3">
      <button class="bg-red-600 text-white px-4 py-2 rounded" @click="logout">
        Cerrar sesión
      </button>

      <button
        v-if="canManage"
        class="bg-blue-700 text-white px-4 py-2 rounded"
        @click="goToAdmin"
      >
        Gestión de usuarios
      </button>
    </div>
  </section>
</template>