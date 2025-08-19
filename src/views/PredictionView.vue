<script setup>
import { ref } from 'vue'
import PredictionForm from '../components/PredictionForm.vue'
import PredictionChart from '../components/PredictionChart.vue'

// (mock) trae del backend cuando quieras
const medications = [
  { id: 'aspirin',       name: 'Aspirin 81mg',         category: 'Cardiovascular' },
  { id: 'metformin',     name: 'Metformin 500mg',      category: 'Diabetes' },
  { id: 'lisinopril',    name: 'Lisinopril 10mg',      category: 'Cardiovascular' },
  { id: 'atorvastatin',  name: 'Atorvastatin 20mg',    category: 'Cholesterol' },
  { id: 'amlodipine',    name: 'Amlodipine 5mg',       category: 'Cardiovascular' },
  { id: 'omeprazole',    name: 'Omeprazole 20mg',      category: 'Gastrointestinal' },
  { id: 'levothyroxine', name: 'Levothyroxine 50mcg',  category: 'Endocrine' },
  { id: 'albuterol',     name: 'Albuterol Inhaler',    category: 'Respiratory' },
]

const rows = ref([])
const lastUpdated = ref(null)
const loading = ref(false)

const generateChartData = (medication, months) => {
  const data = []
  const now = new Date()
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now); d.setMonth(d.getMonth() - i)
    const base = Math.floor(Math.random() * 500) + 800
    const sf = 1 + 0.2 * Math.sin((d.getMonth() / 12) * 2 * Math.PI)
    data.push({
      month: d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      historical: Math.floor(base * sf), predicted: null,
      confidence_upper: null, confidence_lower: null, type: 'historical'
    })
  }
  for (let i = 1; i <= months; i++) {
    const d = new Date(now); d.setMonth(d.getMonth() + i)
    const trend = 1 + i * 0.02
    const base = data[data.length - 1].historical * trend
    const sf = 1 + 0.2 * Math.sin((d.getMonth() / 12) * 2 * Math.PI)
    const pred = Math.floor(base * sf)
    data.push({
      month: d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      historical: null, predicted: pred,
      confidence_upper: Math.floor(pred * 1.15),
      confidence_lower: Math.floor(pred * 0.85),
      type: 'predicted'
    })
  }
  return data
}

const handleGenerate = async ({ medication, months }) => {
  loading.value = true
  await new Promise(r => setTimeout(r, 600))
  rows.value = generateChartData(medication, months)
  lastUpdated.value = new Date()
  loading.value = false
}
</script>

<template>
  <!-- neutraliza el padding del <main> (full-bleed) -->
  <section class="-mx-4 lg:-mx-6 space-y-4 p-6">
    <!-- título con padding reinyectado -->
    <h1 class="px-4 lg:px-6 text-2xl font-semibold text-gray-900">Predicciones</h1>

    <!-- grid full-bleed + contenido centrado -->
    <div class="px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <!-- el class se fusiona con el root del componente -->
      <PredictionForm
        class="h-full max-w-[480px] mx-auto lg:mx-0"
        :medications="medications"
        :loading="loading"
        @generate="handleGenerate"
      />
      <div class="lg:col-span-2">
        <PredictionChart
          class="h-full"
          :rows="rows"
          :loading="loading"
          :lastUpdated="lastUpdated"
        />
      </div>
    </div>
  </section>
</template>
