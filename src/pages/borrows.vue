<script setup lang="ts">
import Paginator from 'primevue/paginator'
import BorrowCard from '@/components/pages/borrows/borrow-card.vue'
import { onMounted, ref } from 'vue'
import { getMyBorrowings } from '@/services/book.service'
import type { Borrowing } from '@/types/book'

const borrowings = ref<Borrowing[]>([])
const pagination = ref({
  page: 0,
  limit: 10,
  total: 0,
  totalPages: 0,
})

const fetchBorrowings = async (params?: { page?: number; limit?: number }) => {
  try {
    const response: any = await getMyBorrowings(params)
    pagination.value = response.data.pagination
    borrowings.value = response.data.list || []
  } catch (error) {
    console.error('Error fetching borrowings:', error)
  }
}

const onPageChange = (event: any) => {
  pagination.value.page = event.page
  pagination.value.limit = event.rows
  fetchBorrowings({ page: event.page, limit: event.rows })
}

onMounted(async () => {
  await fetchBorrowings({ page: pagination.value.page, limit: pagination.value.limit })
})
</script>

<template>
  <div class="max-w-7xl flex flex-col justify-center mx-auto p-6">
    <div v-if="borrowings.length > 0" class="w-full">
      <h1 class="text-4xl font-semibold text-gray-600 text-center py-4">Lịch sử mượn sách</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BorrowCard v-for="borrow in borrowings" :key="borrow._id" :borrow="borrow" />
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center py-16 text-center">
      <div class="text-gray-300 mb-6">
        <i class="pi pi-book text-8xl" :style="{ fontSize: '6rem' }"></i>
      </div>
      <h3 class="text-4xl font-semibold text-gray-600 mb-4!">Chưa có lịch sử mượn sách</h3>
      <p class="text-gray-500 text-lg mb-6 max-w-md">
        Bạn chưa mượn cuốn sách nào. Hãy khám phá thư viện và tìm những cuốn sách yêu thích của bạn!
      </p>

      <!-- Action buttons -->
      <div class="flex gap-4">
        <RouterLink
          to="/books"
          class="bg-(--my-primary-color) text-white px-6 py-3 rounded-lg font-medium hover:bg-(--my-primary-color)/90 transition-colors"
        >
          <i class="pi pi-search mr-2"></i>
          Khám phá sách
        </RouterLink>
      </div>
    </div>

    <Paginator
      v-if="borrowings.length > 0"
      class="mt-6 bg-transparent!"
      @page="onPageChange"
      :rows="pagination.limit"
      :totalRecords="pagination.total"
    ></Paginator>
  </div>
</template>

<style scoped>
:deep(.p-paginator) {
  background-color: transparent !important;
}

:deep(.p-paginator-page.p-paginator-page-selected) {
  background: var(--my-secondary-color);
  color: white;
}
</style>
