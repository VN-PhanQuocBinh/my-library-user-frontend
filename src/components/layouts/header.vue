<script setup lang="ts">
import Navbar from './navbar.vue'
import RightSection from './right-section.vue'
import IconSvg from '../common/IconSvg.vue'

</script>

<template>
   <header
      class="bg-white text-white px-11 fixed left-0 right-0 h-16 z-[100] flex flex-row items-center justify-between gap-4 border-b border-gray-200"
   >
      <div class="flex flex-row items-center gap-2">
         <IconSvg name="logo" class="w-8 h-8 text-(--my-secondary-color)" />
         <h1 class="text-2xl font-bold text-(--my-secondary-color)">MY LIBRARY</h1>
      </div>

      <Navbar />
      <RightSection />
   </header>
</template>
