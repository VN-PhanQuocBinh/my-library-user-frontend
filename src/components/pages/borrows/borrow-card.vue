<script setup lang="ts">
import { Image } from 'primevue'
import type { Book, Borrowing } from '@/types/book'
import { computed, toRefs } from 'vue'

const statusData: Record<string, { label: string; bg: string; text: string }> = {
  pending: { label: 'Đang chờ', bg: 'bg-yellow-50', text: 'text-yellow-800' },
  approved: { label: 'Đã duyệt', bg: 'bg-blue-100', text: 'text-blue-800' },
  rejected: { label: 'Đã từ chối', bg: 'bg-gray-50', text: 'text-gray-800' },
  returned: { label: 'Đã trả', bg: 'bg-green-50', text: 'text-green-800' },
  overdue: { label: 'Quá hạn', bg: 'bg-red-600', text: 'text-white' },
  lost: { label: 'Đã mất', bg: 'bg-gray-50', text: 'text-gray-800' },
}

// State and Props
const props = defineProps<{
  borrow: Borrowing
}>()

const { borrowedAt, returnedAt, maxBorrowDays, status } = toRefs(props.borrow)
const bookInfo = toRefs<Book>(props.borrow.bookId)

const isShowThumb = computed(() => {
  return ['approved', 'overdue'].includes(status.value)
})

const deadline = computed(() => {
  if (!borrowedAt?.value) {
    return new Date() // Return current date if borrowedAt is not set
  }

  const borrowedAtDate = new Date(borrowedAt.value)
  if (isNaN(borrowedAtDate.getTime())) {
    return new Date() // Return current date if borrowedAt is invalid
  }
  const dueDate = new Date(borrowedAtDate)
  dueDate.setDate(borrowedAtDate.getDate() + (maxBorrowDays?.value || 14))
  return dueDate
})

const statusLabel = computed(() => {
  if (!['approved', 'overdue'].includes(status.value) && status.value in statusData) {
    return statusData[status.value].label
  }
  return deadline.value.toLocaleDateString()
})

const daysToDeadlineByPercent = computed(() => {
  const _maxBorrowDays = maxBorrowDays?.value || 14

  if (_maxBorrowDays <= 0) return 0

  const now = new Date()
  const timeDiff = deadline.value.getTime() - now.getTime()
  const daysToDeadline = timeDiff / (1000 * 3600 * 24)
  console.log('daysToDeadline', daysToDeadline)
  if (daysToDeadline <= 0) return 100
  return Math.floor( (daysToDeadline / _maxBorrowDays) * 100)
})
</script>

<template>
  <div
    class="relative flex flex-row justify-start gap-4 bg-white shadow-md rounded-sm p-4 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-200"
  >
    <div class="shrink-0 flex items-center">
      <RouterLink :to="`/books/${borrow.bookId._id}`">
        <img
          :src="bookInfo.coverImage.value.url"
          alt="Borrowed Item"
          class="aspect-[2/3] w-24 object-cover rounded"
        />
      </RouterLink>
    </div>
    <div class="flex-1 flex flex-col gap-2">
      <h2 class="flex-1 text-lg font-semibold line-clamp-2">{{ bookInfo.name }}</h2>
      <div class="flex flex-col gap-2 mt-2">
        <div class="flex-1 flex flex-row items-end gap-2">
          <div class="flex-1 flex flex-col">
            <span class="text-xs text-gray-400">Ngày mượn</span>
            <span class="font-semibold text-sm">{{
              borrowedAt ? new Date(borrowedAt).toLocaleDateString() : 'Chưa duyệt'
            }}</span>
          </div>
          <div class="flex-1 flex flex-col">
            <span class="text-xs text-gray-400">Ngày trả</span>
            <span class="font-semibold text-sm">{{
              returnedAt ? new Date(returnedAt).toLocaleDateString() : 'Chưa trả'
            }}</span>
          </div>
          <div class="flex-1 flex flex-col">
            <span class="text-xs text-gray-400">Số ngày mượn</span>
            <span class="font-semibold text-sm">{{ maxBorrowDays || 14 }}</span>
          </div>
        </div>

        <div :class="['flex justify-end flex-col col-span-2']">
          <span class="text-xs mb-1 text-(--my-secondary-color) font-semibold">Hạn trả</span>

          <!-- Borrow Deadline track -->
          <div
            :class="[
              'relative h-6 w-full rounded-sm overflow-hidden',
              { 'bg-gray-100': status === 'approved' },
              statusData[status].bg,
            ]"
          >
            <span
              :class="[
                'z-20 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 absolute font-semibold',
                statusData[status].text,
                { 'text-white!': daysToDeadlineByPercent <= 0 },
              ]"
              >{{ statusLabel }}</span
            >

            <!-- Borrow Deadline thumb -->
            <div
              v-if="isShowThumb"
              :class="[
                'z-10 absolute left-0 top-0 h-full',
                statusData[status].bg,
                { 'bg-red-600!': daysToDeadlineByPercent <= 0 },
              ]"
              :style="{
                width: `${Math.max(0, Math.min(100, 100 - daysToDeadlineByPercent))}%`,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
