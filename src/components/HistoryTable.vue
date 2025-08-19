<script setup>
import { ref, computed, watch } from 'vue'
import {
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  ArrowUpDown, ArrowUp, ArrowDown, History, Eye
} from 'lucide-vue-next'

const props = defineProps({
  rows: { type: Array, default: () => [] }, // ya filtradas desde el padre
})
// ordenación
const sortField = ref('date')
const sortDir   = ref('desc')

// paginación
const page = ref(1)
const perPage = 10
watch(() => props.rows, () => { page.value = 1 }, { deep: true })

const sortedRows = computed(() => {
  const arr = [...props.rows]
  const field = sortField.value
  const dir = sortDir.value
  arr.sort((a, b) => {
    let av = a[field], bv = b[field]
    if (field === 'date') { av = new Date(av).getTime(); bv = new Date(bv).getTime() }
    if (field === 'quantity' || field === 'cost') { av = parseFloat(av); bv = parseFloat(bv) }
    if (av == null && bv == null) return 0
    if (av == null) return dir === 'asc' ? -1 : 1
    if (bv == null) return dir === 'asc' ? 1 : -1
    return dir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1)
  })
  return arr
})
const totalPages = computed(() => Math.max(1, Math.ceil(sortedRows.value.length / perPage)))
const startIndex = computed(() => (page.value - 1) * perPage)
const endIndex   = computed(() => startIndex.value + perPage)
const pageRows   = computed(() => sortedRows.value.slice(startIndex.value, endIndex.value))

const toggleSort = (f) => {
  if (sortField.value === f) sortDir.value = (sortDir.value === 'asc' ? 'desc' : 'asc')
  else { sortField.value = f; sortDir.value = 'asc' }
}
const sortIcon = (f) => {
  if (sortField.value !== f) return ArrowUpDown
  return sortDir.value === 'asc' ? ArrowUp : ArrowDown
}
const statusClass = (s) => ({
  'Dispensed': 'bg-gray-900 text-white',
  'Pending': 'bg-gray-100 text-gray-700 border',
  'Cancelled': 'bg-red-100 text-red-700',
  'Returned': 'bg-white text-gray-700 border',
}[s] || 'bg-gray-900 text-white')
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
    <div class="px-6 pt-5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-gray-900 font-semibold">
          <History class="h-5 w-5 text-blue-600" /> Historial de uso de medicamentos
        </div>
        <div class="text-sm text-gray-600">
          Mostrando {{ Math.min(startIndex + 1, sortedRows.length) }}-{{ Math.min(endIndex, sortedRows.length) }}
          de {{ sortedRows.length }} registros
        </div>
      </div>
    </div>

    <div class="p-6">
      <div class="rounded-md border overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-50 text-gray-700">
            <tr>
              <th class="p-3 w-[110px] text-left">
                <button class="inline-flex items-center gap-1 font-medium" @click="toggleSort('id')">
                  ID <component :is="sortIcon('id')" class="h-4 w-4" />
                </button>
              </th>
              <th class="p-3 text-left">
                <button class="inline-flex items-center gap-1 font-medium" @click="toggleSort('medication')">
                  Medicamento <component :is="sortIcon('medication')" class="h-4 w-4" />
                </button>
              </th>
              <th class="p-3 text-left">
                <button class="inline-flex items-center gap-1 font-medium" @click="toggleSort('quantity')">
                  Cantidad <component :is="sortIcon('quantity')" class="h-4 w-4" />
                </button>
              </th>
              <th class="p-3 text-left">
                <button class="inline-flex items-center gap-1 font-medium" @click="toggleSort('date')">
                  Fecha <component :is="sortIcon('date')" class="h-4 w-4" />
                </button>
              </th>
              <th class="p-3 text-left">
                <button class="inline-flex items-center gap-1 font-medium" @click="toggleSort('department')">
                  Departamento <component :is="sortIcon('department')" class="h-4 w-4" />
                </button>
              </th>
              <th class="p-3 text-left">
                <button class="inline-flex items-center gap-1 font-medium" @click="toggleSort('prescriber')">
                  Médico <component :is="sortIcon('prescriber')" class="h-4 w-4" />
                </button>
              </th>
              <th class="p-3 text-left">Estado</th>
              <th class="p-3 text-left">
                <button class="inline-flex items-center gap-1 font-medium" @click="toggleSort('cost')">
                  Costo <component :is="sortIcon('cost')" class="h-4 w-4" />
                </button>
              </th>
              <th class="p-3 w-[80px] text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in pageRows" :key="r.id" class="border-t hover:bg-gray-50">
              <td class="p-3 font-medium">{{ r.id }}</td>
              <td class="p-3">
                <div class="font-medium">{{ r.medication }}</div>
                <div class="text-xs text-gray-500">Paciente: {{ r.patient }}</div>
              </td>
              <td class="p-3">{{ r.quantity }} {{ r.unit }}</td>
              <td class="p-3">{{ new Date(r.date).toLocaleDateString() }}</td>
              <td class="p-3">
                <span class="px-2 py-1 rounded-full text-xs" :class="statusClass('Returned')">{{ r.department }}</span>
              </td>
              <td class="p-3">{{ r.prescriber }}</td>
              <td class="p-3">
                <span class="px-2 py-1 rounded-full text-xs" :class="statusClass(r.status)">{{ r.status }}</span>
              </td>
              <td class="p-3">${{ r.cost }}</td>
              <td class="p-3">
                <button class="p-1 rounded hover:bg-gray-100" title="Ver">
                  <Eye class="h-4 w-4" />
                </button>
              </td>
            </tr>
            <tr v-if="pageRows.length === 0">
              <td colspan="9" class="p-6 text-center text-gray-500">Sin resultados</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      <div class="flex items-center justify-between mt-4">
        <div class="text-sm text-gray-600">Página {{ page }} de {{ totalPages }}</div>
        <div class="flex items-center gap-2">
          <button class="border rounded-lg p-2 disabled:opacity-50" :disabled="page===1" @click="page=1">
            <ChevronsLeft class="h-4 w-4" />
          </button>
          <button class="border rounded-lg p-2 disabled:opacity-50" :disabled="page===1" @click="page--">
            <ChevronLeft class="h-4 w-4" />
          </button>
          <button class="border rounded-lg p-2 disabled:opacity-50" :disabled="page===totalPages" @click="page++">
            <ChevronRight class="h-4 w-4" />
          </button>
          <button class="border rounded-lg p-2 disabled:opacity-50" :disabled="page===totalPages" @click="page=totalPages">
            <ChevronsRight class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
