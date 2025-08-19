<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import { Menu } from 'lucide-vue-next'

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <Sidebar :open="open" @close="open = false" logo-src="/src/assets/images/logo+hmmc.png" />
  <button class="lg:hidden fixed top-4 left-4 z-40 bg-white/90 backdrop-blur border rounded-lg p-2 shadow"
          @click="open = true" aria-label="Abrir menú">
    <Menu class="h-5 w-5" />
  </button>
  <main class="lg:ml-64 p-4 lg:p-6 min-h-screen bg-gray-50">
    <RouterView />
  </main>
</template>
