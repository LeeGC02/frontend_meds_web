<script setup>
import { ref } from 'vue'
import { BarChart3, Calendar, Pill, TrendingUp } from 'lucide-vue-next'

const props = defineProps({
  medications: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
})
const emit = defineEmits(['generate'])

const selectedMedication = ref('')
const predictionMonths   = ref('6')
const confidenceLevel    = ref(95)
const seasonality        = ref('auto')

const onGenerate = () => {
  if (!selectedMedication.value) return
  emit('generate', {
    medication: selectedMedication.value,
    months: Number(predictionMonths.value),
    confidence: Number(confidenceLevel.value),
    seasonality: seasonality.value,
  })
}
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm h-full">
    <div class="px-6 pt-5">
      <div class="flex items-center gap-2 text-gray-900 font-semibold">
        <BarChart3 class="h-5 w-5 text-red-600" /> Generar predicción
      </div>
    </div>

    <div class="p-6 space-y-6">
      <!-- Medicamento -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Pill class="h-4 w-4 text-blue-600" /> Seleccionar medicamento
        </label>
        <select v-model="selectedMedication"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-700 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500">
          <option disabled value="">Elige un medicamento…</option>
          <option v-for="m in medications" :key="m.id" :value="m.id">
            {{ m.name }} — {{ m.category }}
          </option>
        </select>
      </div>
      <!-- concentración -->
       <!-- 
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Pill class="h-4 w-4 text-blue-600" /> Concentración
        </label>
        <select v-model="selectedMedication"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-700 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500">
          <option disabled value="">Elige un medicamento…</option>
          <option v-for="m in medications" :key="m.id" :value="m.id">
            {{ m.name }} — {{ m.category }}
          </option>
        </select>
      </div>
  
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Pill class="h-4 w-4 text-blue-600" /> Forma Farmaceutica
        </label>
        <select v-model="selectedMedication"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-700 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500">
          <option disabled value="">Elige un medicamento…</option>
          <option v-for="m in medications" :key="m.id" :value="m.id">
            {{ m.name }} — {{ m.category }}
          </option>
        </select>
      </div>
      unidades de medida 
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Pill class="h-4 w-4 text-blue-600" /> Unidad de Medida
        </label>
        <select v-model="selectedMedication"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-700 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500">
          <option disabled value="">Elige un medicamento…</option>
          <option v-for="m in medications" :key="m.id" :value="m.id">
            {{ m.name }} — {{ m.category }}
          </option>
        </select>
      </div> -->

      <!-- Meses -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Calendar class="h-4 w-4 text-blue-600" /> Periodo de predicción
        </label>
        <select v-model="predictionMonths"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-700 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500">
          <option value="3">3 meses</option>
          <option value="6">6 meses</option>
          <option value="12">12 meses</option>
          <option value="24">24 meses</option>
        </select>
      </div>

      <!-- Parámetros avanzados -->
      <div class="space-y-4">
        <label class="text-sm font-medium text-gray-700">Parámetros avanzados</label>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-xs text-gray-600">Nivel de confianza</label>
            <input type="number" min="80" max="99" v-model.number="confidenceLevel"
                   class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
          </div>
          <div class="space-y-2">
            <label class="text-xs text-gray-600">Estacionalidad</label>
            <select v-model="seasonality"
                    class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option value="auto">Auto</option>
              <option value="monthly">Mensual</option>
              <option value="quarterly">Trimestral</option>
              <option value="none">Ninguna</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Botón -->
      <button :disabled="!selectedMedication || loading"
              class="w-full inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700 transition disabled:opacity-60"
              @click="onGenerate">
        <span v-if="loading" class="flex items-center gap-2">
          <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Generando…
        </span>
        <span v-else class="flex items-center gap-2">
          <TrendingUp class="h-4 w-4" /> Generar predicción
        </span>
      </button>
    </div>
  </div>
</template>
