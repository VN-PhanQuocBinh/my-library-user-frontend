<script setup lang="ts">
import { Image } from 'primevue'
import type { Book, Borrowing } from '@/types/book'
defineProps<{
   borrow: Borrowing
}>()
</script>

<template>
   <div
      class="relative flex flex-row gap-6 bg-white shadow-md rounded-sm p-4 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-200"
   >
      <div
         class="absolute right-0 top-0 px-2 py-1 text-white bg-yellow-700 font-semibold rounded-bl-xl text-center text-xs w-max"
      >
         {{ borrow.status }}
      </div>
      <div>
         <img
            src="data:image/png;base64,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"
            alt="Borrowed Item"
            class="aspect-[2/3] w-24 object-cover rounded"
         />
      </div>
      <div class="flex flex-col">
         <h2 class="text-lg font-semibold">{{ borrow.bookId.name }}</h2>
         <div class="flex-1 flex flex-row gap-6 mt-2">
            <div class="flex flex-col">
               <span class="text-xs">Borrow Date</span>
               <span class="font-semibold">{{
                  new Date(borrow.borrowedAt as Date).toLocaleDateString()
               }}</span>
            </div>
            <div class="flex flex-col">
               <span class="text-xs">Return Date</span>
               <span class="font-semibold">{{
                  borrow.returnedAt
                     ? new Date(borrow.returnedAt).toLocaleDateString()
                     : 'Not returned'
               }}</span>
            </div>
         </div>
         <div class="flex flex-row gap-2 justify-end">
            <button
               class="px-4 py-1 font-semibold rounded-sm bg-(--my-secondary-color)/10 hover:bg-(--my-secondary-color) text-(--my-secondary-color) hover:text-white transition-all duration-200"
            >
               Return
            </button>
         </div>
      </div>
   </div>
</template>
