<script setup lang="ts">
import type { Book } from '@/types/book'

defineProps<{ book: Book }>()
</script>

<template>
   <div
      class="group cursor-pointer bg-stone-50 p-4 rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
   >
      <div class="overflow-hidden rounded-lg">
         <img
            :src="book.coverImage.url"
            alt="Book Cover"
            class="w-full object-cover rounded aspect-[3/5] group-hover:scale-105 transition-transform duration-400"
         />
      </div>
      <div class="flex-1">
         <div class="text-xs text-red-600 px-2 py-1 bg-red-100 rounded-full w-max font-semibold">
            {{ book.genre }}
         </div>
         <h3 class="text-xl font-semibold mb-2">{{ book.name }}</h3>
         <p class="text-gray-500 text-sm mb-4">{{ book.author }}</p>
      </div>

      <div class="flex items-center gap-3">
         <button class="size-9 text-gray-600 bg-blue-50 rounded-[6px]">
            {{ book.quantity }}
         </button>
         <button
            class="size-9 text-gray-500 hover:text-white hover:bg-red-500 hover:border-none border border-gray-500 rounded-[6px] grid place-items-center transition-all"
         >
            <i class="pi pi-heart"></i>
         </button>
         <router-link
            :to="`/books/${book._id}`"
            class="flex-1 bg-(--my-secondary-color) text-white px-4 h-9 rounded transition"
         >
            <button class="text-white w-full h-full">View Details</button>
         </router-link>
      </div>
   </div>
</template>
