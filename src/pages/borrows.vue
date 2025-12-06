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
    <div class="w-full">
      <h1 class="text-4xl font-semibold text-gray-600 text-center py-4">Lịch sử mượn sách</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BorrowCard v-for="borrow in borrowings" :key="borrow._id" :borrow="borrow" />
      </div>
    </div>
    <Paginator
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
