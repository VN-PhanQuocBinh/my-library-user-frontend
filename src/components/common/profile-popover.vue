<script setup lang="ts">
import { toRefs, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { user, logout } = toRefs(authStore)

const formattedTotalDebt = computed(() => {
   if (!user.value?.totalDebt) return '0 đ'

   return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
   }).format(user.value.totalDebt)
})
</script>

<template>
   <div class="flex flex-col gap-3">
      <div class="flex flex-col items-center gap-1 mb-2">
         <div
            class="font-semibold text-2xl text-gray-800 size-14 bg-(--my-primary-color) rounded-full grid place-items-center"
         >
            {{ user?.firstname.charAt(0) }}
         </div>
         <div class="text-gray-800 font-semibold">
            {{ user?.lastname + ' ' + user?.firstname }}
         </div>
         <div class="text-sm text-gray-600">{{ user?.email }}</div>
      </div>

      <div>
         <div class="text-gray-500">Số tiền nợ: </div>
         <div class="font-semibold text-gray-800 text-lg">{{ formattedTotalDebt }}</div>
      </div>

      <button
         @click="logout"
         class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-full transition"
      >
         Logout
      </button>
   </div>
</template>
