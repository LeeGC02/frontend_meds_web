<script setup>
import { ref, computed } from 'vue'
import HistoryFilters from '../components/HistoryFilters.vue'
import HistoryTable from '../components/HistoryTable.vue'

// Generador de datos demo (cámbialo por tu API cuando quieras)
const generateHistoryData = () => {
  const meds = ['Aspirin 81mg','Metformin 500mg','Lisinopril 10mg','Atorvastatin 20mg','Amlodipine 5mg','Omeprazole 20mg','Levothyroxine 50mcg','Albuterol Inhaler']
  const depts = ['Cardiology','Diabetes','Emergency','Internal Medicine','Pharmacy','ICU']
  const statuses = ['Dispensed','Pending','Cancelled','Returned']
  const out = []
  for (let i=0;i<150;i++){
    const d = new Date(); d.setDate(d.getDate()-Math.floor(Math.random()*365))
    out.push({
      id: `MED-${String(i+1).padStart(4,'0')}`,
      medication: meds[Math.floor(Math.random()*meds.length)],
      quantity: Math.floor(Math.random()*100)+10,
      unit: 'tablets',
      date: d.toISOString().split('T')[0],
      department: depts[Math.floor(Math.random()*depts.length)],
      prescriber: `Dr. ${['Smith','Johnson','Williams','Brown','Jones'][Math.floor(Math.random()*5)]}`,
      patient: `Patient ${String(Math.floor(Math.random()*1000)+1).padStart(3,'0')}`,
      status: statuses[Math.floor(Math.random()*statuses.length)],
      cost: (Math.random()*200+10).toFixed(2),
    })
  }
  return out.sort((a,b)=> new Date(b.date)-new Date(a.date))
}

const allRows = ref(generateHistoryData())

// filtros activos
const filters = ref({ search:'', medication:'All Medications', department:'All Departments', dateFrom:'', dateTo:'' })
const medications = ['All Medications', ...Array.from(new Set(allRows.value.map(r=>r.medication)))]
const departments = ['All Departments', ...Array.from(new Set(allRows.value.map(r=>r.department)))]

// aplicar/limpiar
const applyFilters = (f) => { filters.value = f }
const resetFilters = () => { filters.value = { search:'', medication:'All Medications', department:'All Departments', dateFrom:'', dateTo:'' } }

// filtrar en computed
const filteredRows = computed(() => {
  let arr = [...allRows.value]
  const f = filters.value
  if (f.search) {
    const q = f.search.toLowerCase()
    arr = arr.filter(x =>
      x.medication.toLowerCase().includes(q) ||
      x.prescriber.toLowerCase().includes(q) ||
      x.patient.toLowerCase().includes(q) ||
      x.id.toLowerCase().includes(q)
    )
  }
  if (f.medication && f.medication!=='All Medications') arr = arr.filter(x => x.medication===f.medication)
  if (f.department && f.department!=='All Departments') arr = arr.filter(x => x.department===f.department)
  if (f.dateFrom) arr = arr.filter(x => x.date >= f.dateFrom)
  if (f.dateTo)   arr = arr.filter(x => x.date <= f.dateTo)
  return arr
})

// exportar CSV de la vista filtrada
const exportCsv = () => {
  const rows = filteredRows.value
  const header = ['ID','Medication','Quantity','Unit','Date','Department','Prescriber','Patient','Status','Cost']
  const lines = [header.join(',')]
  rows.forEach(r => {
    lines.push([
      r.id, `"${r.medication}"`, r.quantity, r.unit, r.date,
      `"${r.department}"`, `"${r.prescriber}"`, `"${r.patient}"`, r.status, r.cost
    ].join(','))
  })
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'historicos.csv'; a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <!-- full-bleed como en Predicciones -->
  <section class="-mx-4 lg:-mx-6 space-y-4 p-6">
    <h1 class="px-4 lg:px-6 text-2xl font-semibold text-gray-900">Históricos</h1>

    <div class="px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <HistoryFilters
        class="h-full max-w-[520px] mx-auto lg:mx-0"
        :medications="medications"
        :departments="departments"
        @apply="applyFilters"
        @reset="resetFilters"
        @export="exportCsv"
      />
      <div class="lg:col-span-2">
        <HistoryTable :rows="filteredRows" />
      </div>
    </div>
  </section>
</template>
