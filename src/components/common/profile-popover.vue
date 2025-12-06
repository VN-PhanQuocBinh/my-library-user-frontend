<script setup lang="ts">
import { toRefs, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { formatCurrency } from '@/utils/format-currency'
import { useToast } from 'primevue'

const props = defineProps<{ onToggleProfilePopover: (event: MouseEvent) => void }>()

const authStore = useAuthStore()
const { user, logout } = toRefs(authStore)
const toast = useToast()

const formattedTotalDebt = computed(() => {
  if (!user.value?.totalDebt) return '0 đ'

  return formatCurrency(user.value.totalDebt)
})

const handleLogout = async () => {
  console.log('Logging out user...')
  try {
    await logout.value()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Logout failed. Please try again.',
      life: 3000,
    })
  }
}
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
      <div class="text-gray-500">Số tiền nợ:</div>
      <div class="font-semibold text-gray-800 text-lg">{{ formattedTotalDebt }}</div>
    </div>

    <button @click="props.onToggleProfilePopover" class="w-full">
      <router-link
        to="/profile"
        class="w-full bg-(--my-primary-color) hover:bg-amber-400 text-gray-800 font-semibold py-2 rounded-full transition block text-center"
      >
        Hồ sơ của tôi
      </router-link>
    </button>

    <button
      @click="handleLogout"
      class="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-full transition"
    >
      Đăng xuất
    </button>
  </div>
</template>
