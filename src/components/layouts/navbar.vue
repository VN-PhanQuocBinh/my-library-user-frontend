<script setup lang="ts">
const navItems = [
   { label: 'Home', to: '/' },
   { label: 'Books', to: '/books' },
   { label: 'Borrows', to: '/borrows' },
]
</script>

<template>
   <nav
      class="bg-white text-gray-800 font-semibold  z-[100] flex flex-row items-center justify-between gap-3"
   >
      <div v-for="item in navItems" :key="item.label" class="relative group">
         <router-link :to="item.to" class="text-(--my-secondary-color) font-medium hover:underline">
            <div class="px-2 py-1">{{ item.label }}</div>
            <div
               class="opacity-0 group-hover:opacity-100 absolute inset-x-0 bottom-0 h-[1px] bg-gray-400 rounded-md transition-all duration-200"
            ></div>
         </router-link>
      </div>
   </nav>
</template>
