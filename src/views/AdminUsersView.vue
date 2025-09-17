<script setup>
import { ref } from 'vue'
import http from '../api/http'

// Mapa de roles: value (enum BD) -> label (UI)
const roles = [
  { value: 'OPERATOR',   label: 'Personal de Farmacia' },
  { value: 'ADMIN',      label: 'Responsable de Farmacia' },
  { value: 'CONSULTANT', label: 'Personal de adquisiciones' },
  { value: 'SUPERUSER',  label: 'Unidad de Sistemas' },
]

const form = ref({
  full_name: '',
  email: '',
  role: roles[0].value,   // por defecto OPERATOR
  password: '',
  confirm: '',
})

const isLoading = ref(false)
const msg = ref('')
const err = ref('')

const submit = async (e) => {
  e.preventDefault()
  msg.value = ''; err.value = ''
  if (form.value.password !== form.value.confirm) {
    err.value = 'Las contraseñas no coinciden'; return
  }
  isLoading.value = true
  try {
    await http.post('/auth/register', {
      full_name: form.value.full_name,
      email: form.value.email,
      role: form.value.role,       
      password: form.value.password,
    })
    msg.value = 'Usuario creado correctamente.'
    form.value = { full_name:'', email:'', role: roles[0].value, password:'', confirm:'' }
  } catch (e) {
    console.error(e)
    err.value = 'No se pudo crear el usuario (permisos o datos).'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-2xl font-semibold">Gestión de usuarios</h2>
    <div class="bg-white p-6 rounded-xl shadow max-w-xl">
      <form @submit="submit" class="space-y-4">
        <div v-if="msg" class="text-green-600 text-sm">{{ msg }}</div>
        <div v-if="err" class="text-red-600 text-sm">{{ err }}</div>
        <div>
          <label class="text-sm text-gray-700">Nombre completo</label>
          <input v-model="form.full_name" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-sm text-gray-700">Correo</label>
          <input v-model="form.email" type="email" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-sm text-gray-700">Rol</label>
          <select v-model="form.role" class="w-full border rounded px-3 py-2 bg-white">
            <option v-for="r in roles" :key="r.value" :value="r.value">
              {{ r.label }}
            </option>
          </select>
        </div>
        <div>
          <label class="text-sm text-gray-700">Contraseña</label>
          <input v-model="form.password" type="password" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="text-sm text-gray-700">Confirmar contraseña</label>
          <input v-model="form.confirm" type="password" class="w-full border rounded px-3 py-2" />
        </div>
        <button :disabled="isLoading" class="bg-blue-700 text-white px-4 py-2 rounded hover:opacity-90">
          {{ isLoading ? 'Creando...' : 'Crear usuario' }}
        </button>
      </form>
    </div>
  </section>
</template>
