<script setup lang="ts">
import { Image } from 'primevue'
import type { Book, Borrowing } from '@/types/book'
import { computed } from 'vue'
const props = defineProps<{
   borrow: Borrowing
}>()

const statusColor: Record<string, { bg: string; text: string }> = {
   pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
   approved: { bg: 'bg-blue-100', text: 'text-blue-800' },
   rejected: { bg: 'bg-gray-100', text: 'text-gray-800' },
   returned: { bg: 'bg-green-100', text: 'text-green-800' },
   overdue: { bg: 'bg-red-100', text: 'text-red-800' },
   lost: { bg: 'bg-gray-100', text: 'text-gray-800' },
}

const deadline = computed(() => {
   const borrowedAt = new Date(props.borrow.borrowedAt || '')
   if (isNaN(borrowedAt.getTime())) {
      return new Date() // Return current date if borrowedAt is invalid
   }
   const dueDate = new Date(borrowedAt)
   dueDate.setDate(borrowedAt.getDate() + (props.borrow.maxBorrowDays || 14))
   return dueDate
})
const daysToDeadlineByPercent = computed(() => {
   const maxBorrowDays = props.borrow.maxBorrowDays || 14
   if (maxBorrowDays <= 0) return 0

   const now = new Date()
   const timeDiff = deadline.value.getTime() - now.getTime()
   const daysToDeadline = timeDiff / (1000 * 3600 * 24)
   if (daysToDeadline <= 0) return 100
   return Math.ceil((maxBorrowDays - daysToDeadline) / maxBorrowDays + 20)
})

console.log('daysToDeadlineByPercent', daysToDeadlineByPercent.value)
</script>

<template>
   <div
      class="relative flex flex-row justify-start gap-4 bg-white shadow-md rounded-sm p-4 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-200"
   >
      <div
         :class="`absolute right-0 top-0 px-2 pb-1.5 py-1 ${statusColor[borrow.status].text} ${statusColor[borrow.status].bg} font-semibold rounded-bl-xl text-center text-xs w-max capitalize`"
      >
         {{ borrow.status }}
      </div>
      <div class="shrink-0 flex items-center">
         <img
            :src="borrow.bookId.coverImage.url"
            alt="Borrowed Item"
            class="aspect-[2/3] w-24 object-cover rounded"
         />
      </div>
      <div class="flex-1 flex flex-col gap-2">
         <h2 class="text-lg font-semibold line-clamp-2">{{ borrow.bookId.name }}</h2>
         <div class="flex-1 flex flex-col gap-2 mt-2">
            <div class="flex-1 flex flex-row items-end gap-2">
               <div class="flex-1 flex flex-col">
                  <span class="text-xs text-gray-400">Ngày mượn</span>
                  <span class="font-semibold text-sm">{{
                     new Date(borrow.borrowedAt as Date).toLocaleDateString()
                  }}</span>
               </div>
               <div class="flex-1 flex flex-col">
                  <span class="text-xs text-gray-400">Ngày trả</span>
                  <span class="font-semibold text-sm">{{
                     borrow.returnedAt
                        ? new Date(borrow.returnedAt).toLocaleDateString()
                        : 'Chưa trả'
                  }}</span>
               </div>
            </div>
            <div class="flex justify-end flex-col col-span-2">
               <span class="text-xs mb-1 text-(--my-secondary-color) font-semibold">Hạn trả</span>
               <div class="relative h-5 w-full bg-slate-50 rounded-sm">
                  <span
                     class="z-20 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 absolute font-semibold text-(--my-secondary-color)"
                     >{{ deadline.toLocaleDateString() }}</span
                  >
                  <div
                     class="z-10 absolute left-0 top-0 h-full bg-slate-200"
                     :style="{ width: `${Math.max(0, Math.min(100, daysToDeadlineByPercent))}%` }"
                  ></div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
