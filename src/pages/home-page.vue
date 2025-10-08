<script setup>
import { useRouter } from 'vue-router'

import HeroSection from '@/components/pages/home/hero-section.vue'
import GenreSection from '@/components/pages/home/genre-section.vue'
import FeaturedBooks from '@/components/pages/home/featured-books.vue'
import BorrowSteps from '@/components/pages/home/borrow-steps.vue'
</script>

<template>
   <div class="text-gray-800">
      <HeroSection />
      <GenreSection />
      <FeaturedBooks />
      <BorrowSteps />
   </div>
</template>
