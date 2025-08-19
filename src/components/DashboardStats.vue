<script setup>
import { TrendingUp, TrendingDown, Activity, Users } from 'lucide-vue-next'

const stats = [
  { title: 'Total de predicciones', value: '1,247', change: '+12.5%', trend: 'up',   icon: Activity,   color: 'text-blue-600',   bg: 'bg-blue-50' },
  { title: 'Medicamentos activos',  value: '89',    change: '+3.2%',  trend: 'up',   icon: Users,      color: 'text-green-600', bg: 'bg-green-50' },
  { title: 'Reportes generados',    value: '156',   change: '+8.1%',  trend: 'up',   icon: TrendingUp, color: 'text-purple-600',bg: 'bg-purple-50' },
  { title: 'Precisión del modelo',  value: '94.2%', change: '-0.3%',  trend: 'down', icon: TrendingDown,color: 'text-red-600',  bg: 'bg-red-50' },
]
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-900">Resumen del sistema</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(s, i) in stats"
        :key="i"
        class="rounded-xl border border-gray-200 bg-white hover:shadow-md transition"
      >
        <div class="flex items-center justify-between p-4 pb-2">
          <div class="text-sm font-medium text-gray-600">{{ s.title }}</div>
          <div class="p-2 rounded-lg" :class="s.bg">
            <component :is="s.icon" class="h-4 w-4" :class="s.color" />
          </div>
        </div>
        <div class="px-4 pb-4">
          <div class="text-2xl font-bold text-gray-900 mb-1">{{ s.value }}</div>
          <div class="flex items-center text-sm">
            <TrendingUp v-if="s.trend === 'up'" class="h-3 w-3 text-green-500 mr-1" />
            <TrendingDown v-else class="h-3 w-3 text-red-500 mr-1" />
            <span :class="s.trend === 'up' ? 'text-green-600' : 'text-red-600'">{{ s.change }}</span>
            <span class="text-gray-500 ml-1">vs. mes anterior</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
