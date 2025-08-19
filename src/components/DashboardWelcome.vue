<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { BarChart3, TrendingUp, Clock, Users } from 'lucide-vue-next'
import { useUserStore } from '../store/user'

const router = useRouter()
const user = useUserStore()

// nombre amigable desde el email
const displayName = computed(() => {
  if (!user.email) return 'Usuario'
  const base = user.email.split('@')[0]
  return base.charAt(0).toUpperCase() + base.slice(1)
})

const department = computed(() => {
  // si luego tienes el depto real en el store, úsalo aquí
  return 'Unidad de Sistemas'
})

const time = ref('')
const tick = () => {
  time.value = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  })
}
let intId
onMounted(() => { tick(); intId = setInterval(tick, 30_000) })
onBeforeUnmount(() => clearInterval(intId))

const goPrediccion = () => router.push('/predicciones')
const goReportes   = () => router.push('/reportes')
const goHistorico  = () => router.push('/historicos')
</script>

<template>
  <div class="space-y-6">
    <!-- Welcome -->
    <div class="bg-gradient-to-r from-red-600 to-blue-600 rounded-xl p-6 text-white shadow">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold mb-2">¡Bienvenido de nuevo, {{ displayName }}!</h1>
          <p class="text-red-100 mb-4">
            Listo para analizar tendencias de medicamentos y generar insights.
          </p>
          <div class="flex items-center gap-4 text-sm text-red-100">
            <div class="flex items-center gap-1">
              <Clock class="h-4 w-4" />
              <span>{{ time }}</span>
            </div>
            <div class="flex items-center gap-1">
              <Users class="h-4 w-4" />
              <span>{{ department }}</span>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <button
            class="inline-flex items-center rounded-lg border border-white/30 bg-white/20 px-3 py-2 text-sm font-medium text-white hover:bg-white/30 transition"
            @click="goPrediccion"
          >
            <BarChart3 class="h-4 w-4 mr-2" />
            Nueva Predicción
          </button>
        </div>
      </div>
    </div>

    <!-- Acciones rápidas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        class="rounded-xl border border-gray-200 bg-white hover:shadow-md transition cursor-pointer border-l-4 border-l-red-500"
        @click="goPrediccion"
      >
        <div class="p-4">
          <div class="flex items-center gap-3">
            <div class="bg-red-50 p-2 rounded-lg">
              <BarChart3 class="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 class="font-medium text-gray-900">Generar predicción</h3>
              <p class="text-sm text-gray-500">Analiza tendencias de medicamentos</p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="rounded-xl border border-gray-200 bg-white hover:shadow-md transition cursor-pointer border-l-4 border-l-blue-500"
        @click="goReportes"
      >
        <div class="p-4">
          <div class="flex items-center gap-3">
            <div class="bg-blue-50 p-2 rounded-lg">
              <TrendingUp class="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 class="font-medium text-gray-900">Ver reportes</h3>
              <p class="text-sm text-gray-500">Accede a reportes generados</p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="rounded-xl border border-gray-200 bg-white hover:shadow-md transition cursor-pointer border-l-4 border-l-green-500"
        @click="goHistorico"
      >
        <div class="p-4">
          <div class="flex items-center gap-3">
            <div class="bg-green-50 p-2 rounded-lg">
              <Clock class="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 class="font-medium text-gray-900">Historial reciente</h3>
              <p class="text-sm text-gray-500">Consulta análisis pasados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
