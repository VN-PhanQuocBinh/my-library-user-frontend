<script setup lang="ts"></script>

<template>
   <div
      class="group cursor-pointer bg-white p-4 rounded-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
   >
      <div class="overflow-hidden rounded-lg">
         <img
            src="data:image/jpeg;base64,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"
            alt="Book Cover"
            class="w-full object-cover rounded aspect-[3/5] group-hover:scale-105 transition-transform duration-400"
         />
      </div>
      <div>
         <div class="text-xs text-red-600 px-2 py-1 bg-red-100 rounded-full w-max font-semibold">
            Book genre
         </div>
         <h3 class="text-xl font-semibold mb-2">Book Title</h3>
         <p class="text-gray-500 text-sm mb-4">Author Name</p>
      </div>

      <div class="flex items-center gap-3">
         <button class="size-9 text-gray-600 bg-blue-50 rounded-[6px]">20</button>
         <button
            class="size-9 text-gray-500 hover:text-white hover:bg-red-500 hover:border-none border border-gray-500 rounded-[6px] grid place-items-center transition-all"
         >
            <i class="pi pi-heart"></i>
         </button>
         <button class="flex-1 bg-(--my-secondary-color) text-white px-4 h-9 rounded transition">
            Borrow
         </button>
      </div>
   </div>
</template>
