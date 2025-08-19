<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff } from 'lucide-vue-next'

const router = useRouter()

// pestaña activa: "login" | "register"
const activeTab = ref('login')

// estados
const isLoading = ref(false)
const showLoginPass = ref(false)
const showRegPass = ref(false)

// formularios
const login = ref({ email: '', password: '', remember: false })
const reg = ref({
  fullname: '', email: '', rol: '',
  password: '', confirm: ''
})

const handleLogin = async (e) => {
  e.preventDefault()
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    // Redirige al dashboard (ajusta la ruta según tu router)
    router.push('/')
    // Si no tienes router: window.location.href = '/dashboard'
  }, 1200)
}

const handleRegister = async (e) => {
  e.preventDefault()
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    // después de registrarse, vuelve a la pestaña de login
    activeTab.value = 'login'
  }, 1200)
}
</script>

<template>
  <div class="w-full max-w-md mx-auto py-8">
    <!-- Logo y encabezado -->
    <div class="text-center mb-2">
      <div class="flex items-center justify-center mb-4">
        <div class="bg-white rounded-full p-3 shadow-lg border-2 border-red-100">
          <div class="flex items-center space-x-1">
            <img src="../assets/images/logo+hmmc.png" alt="logo+hmmc" class=" h-32 w-32">
          </div>
        </div>
      </div>
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Hospital Municipal Modelo Corea</h1>
      <p class="text-gray-600">Sistema de Análisis Predictivo de Medicamentos</p>
    </div>

    <!-- Card -->
    <div class="shadow-xl border-0 bg-white/95 backdrop-blur rounded-2xl">
      <div class="space-y-1 pb-4 px-6 pt-6">
        <h2 class="text-xl font-semibold text-center text-gray-900">Bienvenido</h2>
        <p class="text-center text-gray-600">
          Acceda al panel de análisis de medicamentos
        </p>
      </div>

      <div class="px-6 pb-6">
        <!-- Tabs -->
        <div class="grid grid-cols-2 mb-6 rounded-lg overflow-hidden">
          <button
            class="py-2 text-center transition font-semibold data-[active=true]:bg-red-600 data-[active=true]:text-white bg-gray-100"
            :data-active="activeTab === 'login'"
            @click="activeTab = 'login'"
          >
            Iniciar Sessión
          </button>
          <button
            class="py-2 text-center transition font-semibold data-[active=true]:bg-blue-600 data-[active=true]:text-white bg-gray-100"
            :data-active="activeTab === 'register'"
            @click="activeTab = 'register'"
          >
            Registrate
          </button>
        </div>

        <!-- LOGIN -->
        <form v-if="activeTab === 'login'" @submit="handleLogin" class="space-y-4">
          <div class="space-y-2">
            <label for="email" class="text-gray-700 text-sm">Correo Electrónico</label>
            <input
              id="email" type="email" v-model="login.email" required
              placeholder="encargado@farmacia.com"
              class="w-full rounded border border-gray-200 px-3 py-2 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div class="space-y-2">
            <label for="password" class="text-gray-700 text-sm">Contraseña</label>
            <div class="relative">
              <input
                id="password"
                :type="showLoginPass ? 'text' : 'password'"
                v-model="login.password"
                required
                placeholder="Ingresar contraseña"
                class="w-full rounded border border-gray-200 px-3 py-2 pr-10 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              <button
                type="button"
                @click="showLoginPass = !showLoginPass"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <EyeOff v-if="showLoginPass" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center space-x-2 text-gray-600">
              <input type="checkbox" v-model="login.remember" class="rounded border-gray-300" />
              <span>Recuerdame</span>
            </label>
            <button type="button" class="text-red-600 hover:text-red-700">¿Olvidaste tu Contraseña?</button>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-red-600 font-semibold hover:bg-red-700 text-white py-2 rounded transition-all duration-200 disabled:opacity-60 hover:scale-[1.02]"
          >
            {{ isLoading ? 'Iniciando Session...' : 'Iniciar Sesión' }}
          </button>
        </form>

        <!-- REGISTER -->
        <form v-else @submit="handleRegister" class="space-y-4">
          <div class="grid gap-4">
            <div class="space-y-2">
              <label for="fullname" class="text-gray-700 text-sm">Nombre Completo</label>
              <input
                id="fullname" v-model="reg.fullname" required placeholder="John Smith"
                class="w-full rounded border border-gray-200 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label for="registerEmail" class="text-gray-700 text-sm">Correo Electronico</label>
            <input
              id="registerEmail" type="email" v-model="reg.email" required placeholder="doctor@hospital.com"
              class="w-full rounded border border-gray-200 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div class="space-y-2">
            <label for="rol" class="text-gray-700 text-sm">Rol en Farmacia</label>
            <select
              id="rol"
              v-model="reg.rol"
              required
              class="w-full rounded border border-gray-200 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-gray-500"
            >
              <option disabled value="" class="hover:text-gray-600">Seleccione…</option>
              <option value="OPERATOR">Personal de Farmacia</option>
              <option value="ADMIN">Responsable de Farmacia</option>
              <option value="CONSULTANT">Personal de adquisiones</option>
              <option value="SUPERUSER">Unidad de Sistemas</option>
            </select>
          </div>

          <div class="space-y-2">
            <label for="registerPassword" class="text-gray-700 text-sm">Contraseña</label>
            <div class="relative">
              <input
                id="registerPassword"
                :type="showRegPass ? 'text' : 'password'"
                v-model="reg.password"
                required
                placeholder="Crea una contraseña fuerte"
                class="w-full rounded border border-gray-200 px-3 py-2 pr-10 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                @click="showRegPass = !showRegPass"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <EyeOff v-if="showRegPass" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label for="confirmPassword" class="text-gray-700 text-sm">Confirma la contraseña</label>
            <input
              id="confirmPassword" type="password" v-model="reg.confirm" required placeholder="Confirma tu contraseña"
              class="w-full rounded border border-gray-200 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 font-semibold hover:bg-blue-700 text-white py-2 rounded transition-all duration-200 disabled:opacity-60 hover:scale-[1.02]"
          >
            {{ isLoading ? 'Creando una cuenta...' : 'Crear Cuenta' }}
          </button>
        </form>
      </div>
    </div>

    <div class="text-center mt-6 text-sm text-gray-600">
      <p>© 2025 Hospital Municipal Modelo Corea. Todos los derechos reservados.</p>
      <p class="mt-1">Seguro • Profesional • Confiable</p>
    </div>
  </div>
</template>
