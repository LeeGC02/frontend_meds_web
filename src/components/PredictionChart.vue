<script setup>
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, Filler
} from 'chart.js'
import { TrendingUp, Calendar, Download, Maximize2 } from 'lucide-vue-next'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const props = defineProps({
  rows: { type: Array, default: () => [] },       // [{month, historical, predicted, confidence_upper, confidence_lower, type}]
  loading: { type: Boolean, default: false },
  lastUpdated: { type: [Date, String, Number], default: null },
})

const chartRef = ref(null)
const hasData = computed(() => props.rows.length > 0)
const labels = computed(() => props.rows.map(r => r.month))

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    { label: 'Historical Usage', data: props.rows.map(r => r.historical), borderColor:'#3b82f6', backgroundColor:'transparent', borderWidth:3, pointRadius:3, pointBackgroundColor:'#3b82f6', tension:0.3, spanGaps:true },
    { label: 'Predicted Usage',  data: props.rows.map(r => r.predicted),  borderColor:'#dc2626', backgroundColor:'transparent', borderWidth:3, borderDash:[6,4], pointRadius:3, pointBackgroundColor:'#dc2626', tension:0.3, spanGaps:true },
    { label: 'Upper Bound',      data: props.rows.map(r => r.confidence_upper), borderColor:'#9ca3af', backgroundColor:'transparent', borderWidth:1, borderDash:[2,2], pointRadius:0, tension:0.2, spanGaps:true },
    { label: 'Lower Bound',      data: props.rows.map(r => r.confidence_lower), borderColor:'#9ca3af', backgroundColor:'transparent', borderWidth:1, borderDash:[2,2], pointRadius:0, tension:0.2, spanGaps:true },
  ],
}))

const chartOptions = {
  responsive: true, maintainAspectRatio: false, interaction:{ intersect:false, mode:'index' },
  plugins: { legend:{ position:'top' }, tooltip:{ callbacks:{ label:(ctx)=> ctx.parsed.y!=null ? `${ctx.dataset.label}: ${Number(ctx.parsed.y).toLocaleString()} units` : null } } },
  scales: { x:{ ticks:{ color:'#374151' } }, y:{ ticks:{ color:'#374151', callback:(v)=>Number(v).toLocaleString() } } }
}

const exportPng = () => {
  const inst = chartRef.value?.chart
  if (!inst) return
  const a = document.createElement('a')
  a.href = inst.toBase64Image('image/png', 1)
  a.download = 'prediction_chart.png'
  a.click()
}
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm h-full">
    <div class="px-6 pt-5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-gray-900 font-semibold">
          <TrendingUp class="h-5 w-5 text-blue-600" /> Predicción de consumo
        </div>
        <div class="flex items-center gap-2">
          <button class="inline-flex items-center border rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  :disabled="!hasData" @click="exportPng">
            <Download class="h-4 w-4 mr-2" /> Exportar
          </button>
          <button class="inline-flex items-center border rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  :disabled="!hasData" title="Maximizar (pendiente)">
            <Maximize2 class="h-4 w-4" />
          </button>
        </div>
      </div>

      <div v-if="lastUpdated" class="flex items-center gap-4 text-sm text-gray-600 mt-2">
        <div class="flex items-center gap-1">
          <Calendar class="h-4 w-4" />
          <span>Actualizado: {{ new Date(lastUpdated).toLocaleDateString() }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="inline-block w-3 h-3 bg-blue-500 rounded-full"></span><span>Histórico</span>
          <span class="inline-block w-3 h-3 bg-red-500 rounded-full"></span><span>Predicción</span>
          <span class="inline-block w-3 h-3 bg-gray-300 rounded-full"></span><span>Confianza</span>
        </div>
      </div>
    </div>

    <div class="px-6 pb-6">
      <div v-if="loading" class="h-96 flex items-center justify-center">
        <div class="text-center">
          <div class="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-gray-600">Generando modelo de predicción…</p>
        </div>
      </div>

      <div v-else-if="hasData" class="h-96 flex items-center justify-center">
        <Line ref="chartRef" :data="chartData" :options="chartOptions" />
      </div>

      <div v-else class="h-96 flex items-center justify-center">
        <div class="text-center">
          <TrendingUp class="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">Sin predicción</h3>
          <p class="text-gray-600">Selecciona un medicamento y genera una predicción para ver el gráfico.</p>
        </div>
      </div>
    </div>
  </div>
</template>
