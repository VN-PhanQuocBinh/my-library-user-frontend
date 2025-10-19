<script setup lang="ts">
import { toRefs } from 'vue'
import type { Book } from '@/types/book'

const props = defineProps<{ book: Book; class?: string }>()
const { _id, coverImage, genre, name, author, quantity } = toRefs(props.book)
</script>

<template>
   <div
      :class="[
         'group cursor-pointer bg-stone-50 p-4 rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4',
         props.class,
      ]"
   >
      <div class="overflow-hidden rounded-lg">
         <img
            :src="coverImage.url"
            alt="Book Cover"
            class="w-full object-cover rounded aspect-[3/5] group-hover:scale-105 transition-transform duration-400"
         />
      </div>
      <div class="flex-1">
         <div class="text-xs text-red-600 px-2 py-1 bg-red-100 rounded-full w-max font-semibold">
            {{ genre }}
         </div>
         <h3 class="text-xl font-semibold mb-2 line-clamp-2">{{ name }}</h3>
         <p class="text-gray-500 text-sm mb-4">{{ author }}</p>
      </div>

      <div class="flex items-center gap-3">
         <button
            v-tooltip.top="`Còn ${quantity} quyển`"
            class="size-9 text-gray-600 bg-blue-50 rounded-[6px]"
         >
            {{ quantity }}
         </button>
         <button
            class="size-9 text-gray-500 hover:text-white hover:bg-red-500 hover:border-none border border-gray-500 rounded-[6px] grid place-items-center transition-all"
         >
            <i class="pi pi-heart"></i>
         </button>
         <RouterLink
            :to="`/books/${_id}`"
            class="flex-1 bg-(--my-secondary-color) hover:bg-(--my-secondary-color)/80 text-white px-4 h-9 rounded transition"
         >
            <button class="text-white w-full h-full line-clamp-1">Xem chi tiết</button>
         </RouterLink>
      </div>
   </div>
</template>
