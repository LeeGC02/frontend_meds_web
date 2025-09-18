<script setup>

  const update_user = (id) => {
    console.log('update pipipi')
  }

  const delete_user = (id) => {
    console.log('delete pipipi')
  }

</script>

<template>
  <div class='w-full'>
    <h1 class='font-semibold text-2xl'>Lista de Usuarios</h1>
    <table class='w-full bg-white p-[20px] border-1 border-slate-200 table-auto'>
      <thead>
        <tr>
          <th class='p-3'>Nombre</th>
          <th class='p-3'>Correo</th>
          <th class='p-3'>Estado</th>
          <th class='p-3'>Fecha</th>
          <th class='p-3'>Accion</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class='p-3'>Marco</td>
          <td class='p-3'>marco@gmail.com</td>
          <td class='p-3'>activo</td>
          <td class='p-3'>10/9/25</td>
          <td class='flex gap-[10px]'>
            <button class='bg-red-300 rounded-xl p-[5px]' @click="delete_user">eliminar</button>
            <button class='bg-orange-300 rounded-xl p-[5px]' @click="update_user">editar</button>
          </td>
        </tr>
        <tr>
          <td class='p-3'>Eibar</td>
          <td class='p-3'>eibar@gmail.com</td>
          <td class='p-3'>activo</td>
          <td class='p-3'>11/9/25</td>
          <td class='flex gap-[10px]'>
            <button class='bg-red-300 rounded-xl p-[5px]' @click="delete_user">eliminar</button>
            <button class='bg-orange-300 rounded-xl p-[5px]' @click="update_user">editar</button>
          </td>
        </tr>
        <tr>
          <td class='p-3'>Victor</td>
          <td class='p-3'>victor@gmail.com</td>
          <td class='p-3'>activo</td>
          <td class='p-3'>12/9/25</td>
          <td class='flex gap-[10px]'>
            <button class='bg-red-300 rounded-xl p-[5px]' @click="delete_user">eliminar</button>
            <button class='bg-orange-300 rounded-xl p-[5px]' @click="update_user">editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
