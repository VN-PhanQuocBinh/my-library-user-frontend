<script setup lang="ts">
import Header from '@/components/layouts/header.vue'
import Footer from '@/components/layouts/footer.vue'
</script>

<template>
   <div class="min-h-screen max-h-screen flex flex-col ">
      <Header />

      <main :class="['flex-grow mx-auto w-full mt-16 custome-scrollbar overflow-y-scroll']">
         <slot />
         <Footer />
      </main>
   </div>
</template>
