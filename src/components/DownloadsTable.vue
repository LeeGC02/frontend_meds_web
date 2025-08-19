<script setup>
import { ref, computed } from 'vue'
import { Download, Search, Eye, Trash2, FileText, Calendar, Filter } from 'lucide-vue-next'

// ====== datos de ejemplo ======
function generateDownloadsData() {
  const reportTypes = ['Monthly Report', 'Annual Report', 'Cost Analysis', 'Top Medications', 'Department Analysis']
  const formats = ['PDF', 'Excel', 'CSV']
  const statuses = ['Available', 'Expired', 'Processing']

  const rows = Array.from({ length: 25 }, (_, i) => ({
    id: `RPT-${String(i + 1).padStart(3, '0')}`,
    name: `${reportTypes[Math.floor(Math.random() * reportTypes.length)]} - ${new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toLocaleDateString()}`,
    type: reportTypes[Math.floor(Math.random() * reportTypes.length)],
    format: formats[Math.floor(Math.random() * formats.length)],
    size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    expiresAt: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    downloads: Math.floor(Math.random() * 10),
  }))

  return rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

// ====== estado ======
const rows = ref(generateDownloadsData())
const q = ref('')
const page = ref(1)
const perPage = 10

// ====== computados (filtro + paginación) ======
const filtered = computed(() =>
  rows.value.filter(
    (r) =>
      r.name.toLowerCase().includes(q.value.toLowerCase()) ||
      r.type.toLowerCase().includes(q.value.toLowerCase()) ||
      r.id.toLowerCase().includes(q.value.toLowerCase())
  )
)

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const startIndex = computed(() => (page.value - 1) * perPage)
const pageRows = computed(() => filtered.value.slice(startIndex.value, startIndex.value + perPage))

// ====== helpers UI ======
const statusPill = (s) =>
  ({
    Available: 'bg-green-50 text-green-700',
    Processing: 'bg-blue-50 text-blue-700',
    Expired: 'bg-red-50 text-red-700',
  }[s] || 'bg-gray-100 text-gray-700')

const removeRow = (item) => {
  rows.value = rows.value.filter((x) => x.id !== item.id)
}

const prev = () => page.value > 1 && (page.value -= 1)
const next = () => page.value < totalPages.value && (page.value += 1)

const preview = (item) => console.log('preview', item.id)
const doDownload = (item) => console.log('download', item.id)
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
    <!-- header -->
    <div class="px-6 pt-5">
      <div class="flex items-center justify-between">
        <h3 class="flex items-center gap-2 text-gray-900 font-semibold">
          <Download class="h-5 w-5 text-blue-600" />
          Descargas y reportes
        </h3>

        <div class="flex items-center gap-2">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              v-model="q"
              placeholder="Buscar descargas..."
              class="pl-10 w-64 rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button class="border rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
            <Filter class="h-4 w-4 mr-2 inline" /> Filtro
          </button>
        </div>
      </div>
    </div>

    <!-- content -->
    <div class="p-6">
      <div class="rounded-md border overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 text-gray-600">
            <tr>
              <th class="text-left font-medium px-4 py-3">Reporte</th>
              <th class="text-left font-medium px-4 py-3">Tipo</th>
              <th class="text-left font-medium px-4 py-3">Formato</th>
              <th class="text-left font-medium px-4 py-3">Tamaño</th>
              <th class="text-left font-medium px-4 py-3">Creado</th>
              <th class="text-left font-medium px-4 py-3">Expira</th>
              <th class="text-left font-medium px-4 py-3">Estado</th>
              <th class="text-left font-medium px-4 py-3">Descargas</th>
              <th class="text-left font-medium px-4 py-3 w-[120px]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pageRows" :key="item.id" class="hover:bg-gray-50">
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <FileText class="h-4 w-4 text-gray-500" />
                  <div>
                    <div class="font-medium">{{ item.name }}</div>
                    <div class="text-xs text-gray-500">{{ item.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3">
                <span class="px-2 py-1 rounded-full text-xs border">{{ item.type }}</span>
              </td>
              <td class="px-4 py-3">{{ item.format }}</td>
              <td class="px-4 py-3">{{ item.size }}</td>
              <td class="px-4 py-3">{{ new Date(item.createdAt).toLocaleDateString() }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-1">
                  <Calendar class="h-3 w-3 text-gray-400" />
                  <span>{{ new Date(item.expiresAt).toLocaleDateString() }}</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <span class="px-2 py-1 rounded-full text-xs font-medium" :class="statusPill(item.status)">
                  {{ item.status }}
                </span>
              </td>
              <td class="px-4 py-3">{{ item.downloads }}</td>
              <td class="px-2 py-2">
                <div class="flex items-center gap-1">
                  <template v-if="item.status === 'Available'">
                    <button class="p-2 rounded hover:bg-gray-100" title="Ver" @click="preview(item)">
                      <Eye class="h-3 w-3" />
                    </button>
                    <button class="p-2 rounded hover:bg-gray-100" title="Descargar" @click="doDownload(item)">
                      <Download class="h-3 w-3" />
                    </button>
                  </template>
                  <button class="p-2 rounded hover:bg-gray-100" title="Eliminar" @click="removeRow(item)">
                    <Trash2 class="h-3 w-3" />
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="!pageRows.length">
              <td colspan="9" class="px-4 py-10 text-center text-gray-500">Sin resultados</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- paginación -->
      <div class="flex items-center justify-between mt-4">
        <div class="text-sm text-gray-600">
          Mostrando {{ startIndex + 1 }}–{{ Math.min(startIndex + perPage, filtered.length) }} de
          {{ filtered.length }} descargas
        </div>
        <div class="flex items-center gap-2">
          <button
            class="border rounded-lg px-3 py-1.5 text-sm disabled:opacity-50"
            :disabled="page === 1"
            @click="prev"
          >
            Anterior
          </button>
          <span class="text-sm text-gray-600">Página {{ page }} de {{ totalPages }}</span>
          <button
            class="border rounded-lg px-3 py-1.5 text-sm disabled:opacity-50"
            :disabled="page === totalPages"
            @click="next"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
