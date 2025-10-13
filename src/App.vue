<template>
   <component :is="layout">
      <router-view />
   </component>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import defaultLayout from './layouts/default-layout.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const layout = computed(() => {
   return route.meta.layout || defaultLayout
})

onMounted(() => {
   authStore.verifyAuthentication()
})
</script>
