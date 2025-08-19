<script setup>
import DownloadsTable from '../components/DownloadsTable.vue' // usa '../components/DownloadsTable.vue' si no tienes alias @
</script>

<template>
  <section class="-mx-4 lg:-mx-6 space-y-4 p-6">
    <h1 class="px-4 lg:px-6 text-2xl font-semibold text-gray-900">Descargas</h1>
    <div class="px-4 lg:px-6">
      <DownloadsTable />
    </div>
  </section>
</template>
