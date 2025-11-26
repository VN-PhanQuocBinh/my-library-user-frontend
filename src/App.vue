<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import defaultLayout from './layouts/default-layout.vue'
import { useAuthStore } from './stores/auth'
import '@/assets/css/custom.css'

import chatBotDrawer from './components/chat-bot-drawer/chat-bot-drawer.vue'

const authStore = useAuthStore()
const route = useRoute()
const layout = computed(() => {
   return route.meta.layout || defaultLayout
})

onMounted(() => {
   authStore.verifyAuthentication()
})
</script>

<template>
   <component :is="layout">
      <router-view />
   </component>
   <chatBotDrawer />
</template>
