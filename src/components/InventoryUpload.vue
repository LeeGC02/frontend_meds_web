<script setup>
import { ref } from 'vue'
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Package } from 'lucide-vue-next'

const emit = defineEmits(['upload', 'error'])

const fileInput = ref(null)
const selectedFile = ref(null)
const isUploading = ref(false)
const uploadStatus = ref(null)
const uploadMessage = ref('')

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    const fileName = file.name.toLowerCase()
    if (!fileName.endsWith('.csv') && !fileName.endsWith('.xlsx')) {
      showError('Por favor selecciona un archivo CSV o XLSX válido')
      return
    }
    
    if (file.size > 10 * 1024 * 1024) {
      showError('El archivo es demasiado grande. Máximo 10MB')
      return
    }
    
    selectedFile.value = file
    uploadStatus.value = null
    uploadMessage.value = ''
  }
}

const showError = (message) => {
  uploadStatus.value = 'error'
  uploadMessage.value = message
  emit('error', message)
}

const showSuccess = (message) => {
  uploadStatus.value = 'success'
  uploadMessage.value = message
}

const handleUpload = async () => {
  if (!selectedFile.value) {
    showError('Por favor selecciona un archivo CSV o XLSX')
    return
  }

  isUploading.value = true
  uploadStatus.value = null
  uploadMessage.value = ''

  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    showSuccess(`Archivo "${selectedFile.value.name}" cargado exitosamente. El inventario de medicamentos ha sido actualizado.`)
    emit('upload', selectedFile.value)
    
    selectedFile.value = null
    if (fileInput.value) {
      fileInput.value.value = ''
    }
    
  } catch (error) {
    showError('Error al cargar el archivo. Por favor intenta nuevamente.')
    console.error('Error uploading inventory:', error)
  } finally {
    isUploading.value = false
  }
}

const clearFile = () => {
  selectedFile.value = null
  uploadStatus.value = null
  uploadMessage.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const openFileDialog = () => {
  fileInput.value?.click()
}
</script>

<template>
  <div>
    <div>
      <div class="flex items-center gap-2 mb-4">
        <Package class="h-5 w-5 text-blue-600" />
        <h3 class="text-lg font-medium text-gray-900">Actualizar inventario</h3>
      </div>
      
      <p class="text-sm text-gray-600 mb-6">
        Sube un archivo CSV o XLSX con datos de medicamentos para actualizar el inventario. 
        El archivo debe contener información como: Código, Nombre, Stock, Precio, Proveedor, etc.
      </p>

      <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
        <input
          ref="fileInput"
          type="file"
          accept=".csv,.xlsx"
          @change="handleFileSelect"
          class="hidden"
        />
        
        <div v-if="!selectedFile" @click="openFileDialog" class="cursor-pointer">
          <Upload class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p class="text-lg font-medium text-gray-700 mb-2">
            Haz clic para seleccionar un archivo CSV o XLSX
          </p>
          <p class="text-sm text-gray-500">
            O arrastra y suelta el archivo aquí
          </p>
          <p class="text-xs text-gray-400 mt-2">
            Máximo 10MB • Solo archivos .csv y .xlsx
          </p>
        </div>

        <div v-else class="space-y-4">
          <div class="flex items-center justify-center gap-3">
            <FileText class="h-8 w-8 text-blue-600" />
            <div class="text-left">
              <p class="font-medium text-gray-900">{{ selectedFile.name }}</p>
              <p class="text-sm text-gray-500">
                {{ (selectedFile.size / 1024 / 1024).toFixed(2) }} MB
              </p>
            </div>
          </div>
          
          <div class="flex items-center justify-center gap-3">
            <button
              @click="handleUpload"
              :disabled="isUploading"
              class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg px-6 py-2 inline-flex items-center"
            >
              <Loader2 v-if="isUploading" class="h-4 w-4 mr-2 animate-spin" />
              <Upload v-else class="h-4 w-4 mr-2" />
              {{ isUploading ? 'Cargando...' : 'Actualizar inventario' }}
            </button>
            
            <button
              @click="clearFile"
              :disabled="isUploading"
              class="border border-gray-300 hover:bg-gray-50 disabled:opacity-50 text-gray-700 rounded-lg px-4 py-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

      <div v-if="uploadStatus" class="mt-4 p-4 rounded-lg" :class="{
        'bg-green-50 border border-green-200': uploadStatus === 'success',
        'bg-red-50 border border-red-200': uploadStatus === 'error'
      }">
        <div class="flex items-center gap-2">
          <CheckCircle v-if="uploadStatus === 'success'" class="h-5 w-5 text-green-600" />
          <AlertCircle v-if="uploadStatus === 'error'" class="h-5 w-5 text-red-600" />
          <p class="text-sm font-medium" :class="{
            'text-green-800': uploadStatus === 'success',
            'text-red-800': uploadStatus === 'error'
          }">
            {{ uploadMessage }}
          </p>
        </div>
      </div>

    </div>
  </div>
</template>
