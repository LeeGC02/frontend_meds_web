<script setup>
import { ref, computed } from 'vue'
import { FileText, Calendar, BarChart3, Download, Eye, Settings } from 'lucide-vue-next'

const emit = defineEmits(['generated'])

const reportTypes = [
  { id: 'monthly',            name: 'Monthly Usage Report',   description: 'Detailed monthly medication usage analysis' },
  { id: 'annual',             name: 'Annual Summary Report',  description: 'Comprehensive yearly medication trends' },
  { id: 'top-medications',    name: 'Top Medications Report', description: 'Most frequently used medications' },
  { id: 'department',         name: 'Department Analysis',    description: 'Usage breakdown by department' },
  { id: 'cost-analysis',      name: 'Cost Analysis Report',   description: 'Financial analysis of medication costs' },
  { id: 'prediction-summary', name: 'Prediction Summary',     description: 'Summary of prediction accuracy and trends' },
]
const departments = ['All Departments','Cardiology','Diabetes','Emergency','Internal Medicine','Pharmacy','ICU']

const selectedReportType = ref('')
const selectedDepartment = ref('All Departments')
const dateFrom = ref('')
const dateTo   = ref('')
const includeCharts  = ref(true)
const includeRawData = ref(false)
const isGenerating   = ref(false)

const selectedReport = computed(() => reportTypes.find(r => r.id === selectedReportType.value))

const handleGenerateReport = async () => {
  if (!selectedReportType.value) return
  isGenerating.value = true
  setTimeout(() => {
    isGenerating.value = false
    const payload = {
      type: selectedReportType.value,
      department: selectedDepartment.value,
      dateFrom: dateFrom.value,
      dateTo: dateTo.value,
      includeCharts: includeCharts.value,
      includeRawData: includeRawData.value,
    }
    // 1) emitir al padre (si lo usa)
    emit('generated', payload)
    // 2) evento global para acoplar con RecentReports.vue
    window.dispatchEvent(new CustomEvent('reportGenerated', { detail: payload }))
  }, 1200)
}
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
    <div class="px-6 pt-5">
      <h3 class="flex items-center gap-2 text-gray-900 font-semibold">
        <FileText class="h-5 w-5 text-red-600" /> Crear nuevo reporte
      </h3>
    </div>

    <div class="p-6 space-y-6">
      <!-- Tipo de reporte -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
          <BarChart3 class="h-4 w-4 text-blue-600" /> Tipo de reporte
        </label>
        <select
          v-model="selectedReportType"
          class="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-700 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
        >
          <option disabled value="">Elige un tipo…</option>
          <option v-for="r in reportTypes" :key="r.id" :value="r.id">
            {{ r.name }}
          </option>
        </select>
        <p v-if="selectedReport" class="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          {{ selectedReport.description }}
        </p>
      </div>

      <!-- Rango de fechas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Calendar class="h-4 w-4 text-blue-600" /> Desde
          </label>
          <input
            type="date" v-model="dateFrom"
            class="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Calendar class="h-4 w-4 text-blue-600" /> Hasta
          </label>
          <input
            type="date" v-model="dateTo"
            class="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>
      </div>

      <!-- Departamento -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Departamento</label>
        <select
          v-model="selectedDepartment"
          class="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-700 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
        >
          <option v-for="d in departments" :key="d" :value="d">{{ d }}</option>
        </select>
      </div>

      <!-- Opciones -->
      <div class="space-y-3">
        <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Settings class="h-4 w-4 text-blue-600" /> Opciones del reporte
        </label>

        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="includeCharts" class="rounded border-gray-300" />
          <span class="text-sm">Incluir gráficos y visualizaciones</span>
        </label>

        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="includeRawData" class="rounded border-gray-300" />
          <span class="text-sm">Incluir tablas de datos crudos</span>
        </label>
      </div>

      <!-- Acciones -->
      <div class="pt-4 border-t border-gray-200">
        <button
          class="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 transition-all disabled:opacity-60"
          :disabled="!selectedReportType || isGenerating"
          @click="handleGenerateReport"
        >
          <span v-if="isGenerating" class="inline-flex items-center gap-2">
            <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Generando reporte…
          </span>
          <span v-else class="inline-flex items-center gap-2">
            <FileText class="h-4 w-4" /> Generar reporte
          </span>
        </button>

        <div v-if="selectedReportType && !isGenerating" class="flex items-center justify-center gap-3 mt-4">
          <button class="border rounded-lg px-3 py-1.5 text-sm hover:bg-gray-50">
            <Eye class="h-4 w-4 mr-2 inline" /> Previsualizar
          </button>
          <button class="border rounded-lg px-3 py-1.5 text-sm hover:bg-gray-50">
            <Download class="h-4 w-4 mr-2 inline" /> Descargar PDF
          </button>
          <button class="border rounded-lg px-3 py-1.5 text-sm hover:bg-gray-50">
            <Download class="h-4 w-4 mr-2 inline" /> Descargar Excel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
