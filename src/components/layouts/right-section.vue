<script setup lang="ts">
import { ref, watch } from 'vue'
import { Popover, InputText } from 'primevue'

import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

import SearchDialog from '../common/search-dialog.vue'
import ProfilePopover from '../common/profile-popover.vue'

const authStore = useAuthStore()
const { user, isAuthenticated } = storeToRefs(authStore)
const { logout } = authStore

const openProfilePopover = ref<any>(null)

const toggleProfilePopover = (event: MouseEvent) => {
   openProfilePopover.value.toggle(event)
}

const searchDialogOpen = ref(false)
</script>

<template>
   <div v-if="isAuthenticated" class="flex flex-row items-center gap-6">
      <button
         @click="searchDialogOpen = true"
         class="flex flex-row items-center px-4 rounded-full bg-gray-100 border transition cursor-pointer"
      >
         <i class="pi pi-search text-gray-400" :style="{ fontSize: '1rem' }" />
         <div
            placeholder="Search"
            unstyled
            class="text-left outline-none text-gray-400 px-3 py-2 min-w-40"
         >
            Search books
         </div>
      </button>

      <SearchDialog :open="searchDialogOpen" @update:open="searchDialogOpen = $event" />

      <router-link to="/borrows">
         <button
            class="text-gray-400 hover:text-gray-800 font-semibold size-7 rounded-full transition"
         >
            <i class="pi pi-address-book" :style="{ fontSize: '1.5rem' }"></i>
         </button>
      </router-link>
      <button
         @click="toggleProfilePopover"
         class="text-gray-400 hover:text-gray-800 font-semibold size-7 rounded-full transition"
      >
         <i class="pi pi-user" :style="{ fontSize: '1.5rem' }"></i>
      </button>

      <Popover ref="openProfilePopover" class="w-64 p-2 shadow-lg">
         <ProfilePopover />
      </Popover>
   </div>

   <div v-else class="flex flex-row gap-2">
      <router-link to="/login">
         <button
            class="bg-(--my-primary-color) text-gray-800 font-semibold py-2 min-w-24 rounded-full hover:bg-amber-400 transition"
         >
            Login
         </button>
      </router-link>

      <router-link to="/register">
         <button
            class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 min-w-24 rounded-full transition"
         >
            Sign up
         </button>
      </router-link>
   </div>
</template>
