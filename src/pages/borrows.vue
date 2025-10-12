<script setup lang="ts">
import BorrowCard from '@/components/pages/borrows/borrow-card.vue'
import { onMounted, ref } from 'vue'
import { getMyBorrowings } from '@/services/book.service'
import type { Borrowing } from '@/types/book'

const borrowings = ref<Borrowing[]>([])

const fetchBorrowings = async () => {
   try {
      const response: any = await getMyBorrowings()
      borrowings.value = response.data.list || []
   } catch (error) {
      console.error('Error fetching borrowings:', error)
   }
}

onMounted(async () => {
   await fetchBorrowings()
})
</script>

<template>
   <div class="max-w-6xl flex justify-center mx-auto p-6">
      <div>
         <h1 class="text-4xl font-semibold text-gray-600 text-center py-4">Your Borrow List</h1>
         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <BorrowCard v-for="borrow in borrowings" :key="borrow._id" :borrow="borrow" />
         </div>
      </div>
   </div>
</template>
