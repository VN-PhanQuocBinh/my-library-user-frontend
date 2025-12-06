<script setup lang="ts">
const navItems = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Sách', to: '/books' },
  { label: 'Mượn sách', to: '/borrows' },
]
</script>

<template>
  <nav class="bg-white font-semibold z-[100] flex flex-row items-center justify-between gap-3">
    <div
      v-for="item in navItems"
      :key="item.label"
      :class="[
        'relative group',
        item.to === $route.path
          ? 'text-(--my-secondary-color)'
          : 'text-gray-500 hover:text-(--my-secondary-color)',
      ]"
    >
      <router-link :to="item.to" class="font-medium">
        <div class="px-2 py-1">{{ item.label }}</div>
      </router-link>
    </div>
  </nav>
</template>
