<script setup>
import ReportBuilder from '../components/ReportBuilder.vue'
import RecentReports from '../components/RecentReports.vue'
</script>

<template>
  <section class="-mx-4 lg:-mx-6 space-y-4 p-6">
    <h1 class="px-4 lg:px-6 text-2xl font-semibold text-gray-900">Reportes</h1>

    <div class="px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ReportBuilder class="lg:col-span-2" />
      <RecentReports />
    </div>
  </section>
</template>
