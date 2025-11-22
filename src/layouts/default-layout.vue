<script setup lang="ts">
import Header from '@/components/layouts/header.vue'
import Footer from '@/components/layouts/footer.vue'
</script>

<template>
   <div class="min-h-screen max-h-screen flex flex-col">
      <Header />

      <main :class="['flex-grow flex flex-col mx-auto w-full mt-16 custom-scrollbar overflow-y-auto']">
         <div class="flex-1 pb-10 bg-slate-50">
            <slot />
         </div>
         <Footer />
      </main>
   </div>
</template>
