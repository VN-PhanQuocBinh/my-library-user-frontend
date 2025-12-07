<script setup lang="ts">
import BookCard from '@/components/common/book-card.vue'
import { getBooks } from '@/services/book.service'
import type { Book } from '@/types/book'
import { onMounted, ref } from 'vue'
import AnimatedSection from '@/components/common/animated-section.vue'
import { useAuthStore } from '@/stores/auth'

const books = ref<Book[]>([])
const authStore = useAuthStore()

onMounted(async () => {
   const response = await getBooks()
   books.value = response.data.list.slice(0, 5) // Lấy 5 cuốn sách đầu tiên
})
</script>

<template>
   <section v-if="authStore.isAuthenticated" class="py-16 px-11">
      <div class="mx-auto flex flex-row justify-between items-center mb-8">
         <AnimatedSection :delay="0.2">
            <h2 class="text-2xl font-bold mb-8 text-center text-gray-800">
               <span> Sách nổi bật </span>
            </h2>
         </AnimatedSection>
         <router-link to="/books">
            <AnimatedSection :delay="0.25">
               <button
                  class="bg-(--my-primary-color) text-(--my-secondary-color) font-semibold py-2 px-5 rounded-full flex flex-row items-center gap-2 group"
               >
                  <span>Xem toàn bộ sách</span>
                  <i class="pi pi-arrow-right group-hover:translate-x-1 transition-transform"></i>
               </button>
            </AnimatedSection>
         </router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
         <!-- Example Book Card -->
         <AnimatedSection v-for="(book, index) in books" :key="book._id" :delay="index * 0.05">
            <BookCard class="h-full" :book="book" />
         </AnimatedSection>
      </div>
   </section>
</template>
