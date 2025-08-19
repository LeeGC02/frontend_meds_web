<script setup>
import { ref } from 'vue'
import { Calendar, Search, Filter, RotateCcw, Download } from 'lucide-vue-next'

const props = defineProps({
  medications: { type: Array, default: () => [] },   // ['All Medications', 'Aspirin ...', ...]
  departments: { type: Array, default: () => [] },   // ['All Departments', 'Cardiology', ...]
})
const emit = defineEmits(['apply', 'reset', 'export'])

const searchTerm = ref('')
const selectedMedication = ref(props.medications[0] || 'All Medications')
const selectedDepartment = ref(props.departments[0] || 'All Departments')
const dateFrom = ref('')
const dateTo = ref('')

const onReset = () => {
  searchTerm.value = ''
  selectedMedication.value = props.medications[0] || 'All Medications'
  selectedDepartment.value = props.departments[0] || 'All Departments'
  dateFrom.value = ''
  dateTo.value = ''
  emit('reset')
}
const onApply = () => {
  emit('apply', {
    search: searchTerm.value,
    medication: selectedMedication.value,
    department: selectedDepartment.value,
    dateFrom: dateFrom.value,
    dateTo: dateTo.value,
  })
}
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm h-full">
    <div class="p-6">
      <div class="flex items-center gap-2 mb-4">
        <Filter class="h-5 w-5 text-blue-600" />
        <h3 class="text-lg font-medium text-gray-900">Filtrar históricos</h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Búsqueda -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Buscar</label>
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              v-model="searchTerm"
              placeholder="Buscar registros…"
              class="pl-10 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Medicamento -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Medicamento</label>
          <select
            v-model="selectedMedication"
            class="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option v-for="m in medications" :key="m" :value="m">{{ m }}</option>
          </select>
        </div>

        <!-- Departamento -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Departamento</label>
          <select
            v-model="selectedDepartment"
            class="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option v-for="d in departments" :key="d" :value="d">{{ d }}</option>
          </select>
        </div>

        <!-- Rango de fechas -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Desde</label>
          <div class="relative">
            <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date" v-model="dateFrom"
              class="pl-10 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Hasta</label>
          <div class="relative">
            <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date" v-model="dateTo"
              class="pl-10 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <div class="flex items-center gap-2">
          <button @click="onApply" class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 inline-flex items-center">
            <Filter class="h-4 w-4 mr-2" /> Aplicar
          </button>
          <button @click="onReset" class="border rounded-lg px-4 py-2 inline-flex items-center hover:bg-gray-50">
            <RotateCcw class="h-4 w-4 mr-2" /> Reset
          </button>
        </div>
        <button @click="$emit('export')" class="border rounded-lg px-4 py-2 inline-flex items-center hover:bg-gray-50">
          <Download class="h-4 w-4 mr-2" /> Exportar
        </button>
      </div>
    </div>
  </div>
</template>
