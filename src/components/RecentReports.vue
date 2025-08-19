<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Clock, Eye, Download, Trash2, FileText } from 'lucide-vue-next'

// datos de ejemplo
function generateRecentReports() {
  return [
    { id: 'RPT-001', name: 'Monthly Usage Report - December 2024', type: 'Monthly Report', createdAt: '2024-12-15', status: 'completed', size: '2.4 MB', format: 'PDF' },
    { id: 'RPT-002', name: 'Top Medications Analysis',               type: 'Analysis Report', createdAt: '2024-12-14', status: 'completed', size: '1.8 MB', format: 'Excel' },
    { id: 'RPT-003', name: 'Department Cost Analysis',                type: 'Cost Report',     createdAt: '2024-12-13', status: 'processing', size: '-',      format: 'PDF' },
    { id: 'RPT-004', name: 'Annual Summary 2024',                     type: 'Annual Report',   createdAt: '2024-12-12', status: 'completed', size: '5.2 MB', format: 'PDF' },
    { id: 'RPT-005', name: 'Prediction Accuracy Report',              type: 'Prediction Report',createdAt: '2024-12-11', status: 'failed',     size: '-',      format: 'Excel' },
  ]
}

const reports = ref([])

const statusPill = (status) => ({
  completed: 'bg-green-50 text-green-700',
  processing: 'bg-blue-50 text-blue-700',
  failed: 'bg-red-50 text-red-700',
}[status] || 'bg-gray-100 text-gray-700')

const onReportGenerated = (ev) => {
  const n = reports.value.length + 1
  const id = `RPT-${String(n).padStart(3,'0')}`
  reports.value = [
    {
      id,
      name: `${ev.detail.type} - ${new Date().toLocaleDateString()}`,
      type: 'Generated Report',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'completed',
      size: '1.2 MB',
      format: 'PDF',
    },
    ...reports.value,
  ]
}

onMounted(() => {
  reports.value = generateRecentReports()
  window.addEventListener('reportGenerated', onReportGenerated)
})
onBeforeUnmount(() => {
  window.removeEventListener('reportGenerated', onReportGenerated)
})

// acciones demo
const preview  = (r) => console.log('preview', r.id)
const download = (r) => console.log('download', r.id)
const remove   = (r) => reports.value = reports.value.filter(x => x.id !== r.id)
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
    <div class="px-6 pt-5">
      <h3 class="flex items-center gap-2 text-gray-900 font-semibold">
        <Clock class="h-5 w-5 text-blue-600" /> Reportes recientes
      </h3>
    </div>

    <div class="p-6">
      <div class="space-y-4">
        <div
          v-for="r in reports.slice(0,5)"
          :key="r.id"
          class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-start justify-between mb-2">
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-medium text-gray-900 truncate">{{ r.name }}</h4>
              <p class="text-xs text-gray-500 mt-1">{{ r.type }}</p>
            </div>
            <span class="px-2 py-1 rounded-full text-xs font-medium" :class="statusPill(r.status)">
              {{ r.status[0].toUpperCase()+r.status.slice(1) }}
            </span>
          </div>

          <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span>{{ new Date(r.createdAt).toLocaleDateString() }}</span>
            <span>{{ r.format }} • {{ r.size }}</span>
          </div>

          <div class="flex items-center gap-2">
            <template v-if="r.status==='completed'">
              <button class="border rounded-lg px-3 py-1.5 text-sm flex-1 hover:bg-gray-50" @click="preview(r)">
                <Eye class="h-3 w-3 mr-1 inline" /> Ver
              </button>
              <button class="border rounded-lg px-3 py-1.5 text-sm flex-1 hover:bg-gray-50" @click="download(r)">
                <Download class="h-3 w-3 mr-1 inline" /> Descargar
              </button>
            </template>
            <div v-else-if="r.status==='processing'" class="flex-1 text-center text-xs text-blue-600">Procesando…</div>
            <button v-else class="border rounded-lg px-3 py-1.5 text-sm flex-1 hover:bg-gray-50">Reintentar</button>

            <button class="p-2 rounded hover:bg-gray-100" title="Eliminar" @click="remove(r)">
              <Trash2 class="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      <div class="mt-4 pt-4 border-t border-gray-200">
        <button class="w-full border rounded-lg px-4 py-2 text-sm hover:bg-gray-50">
          <FileText class="h-4 w-4 mr-2 inline" /> Ver todos los reportes
        </button>
      </div>
    </div>
  </div>
</template>
