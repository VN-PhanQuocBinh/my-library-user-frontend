<script setup lang="ts">
import BookCard from '@/components/common/book-card.vue'
import { getBooks } from '@/services/book.service'
import type { Book } from '@/types/book'
import { onMounted, ref } from 'vue'

const books = ref<Book[]>([])

onMounted(async () => {
   const response = await getBooks()
   books.value = response.data.list.slice(0, 5) // Lấy 5 cuốn sách đầu tiên
})
</script>

<template>
   <section class="py-16 px-11">
      <div class="mx-auto flex flex-row justify-between items-center mb-8">
         <h2 class="text-2xl font-bold mb-8 text-center text-gray-800">Sách nổi bật</h2>
         <router-link to="/books">
            <button
               class="bg-(--my-primary-color) text-(--my-secondary-color) font-semibold py-2 px-5 rounded-full flex flex-row items-center gap-2 group"
            >
               <span>Xem toàn bộ sách</span>
               <i class="pi pi-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </button>
         </router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
         <!-- Example Book Card -->
         <BookCard v-for="book in books" :key="book._id" :book="book" />
      </div>
   </section>
</template>
