<script setup lang="ts">
import { Select } from 'primevue'

import Paginator from 'primevue/paginator'
import ProgressSpinner from 'primevue/progressspinner'

import { onMounted, ref, watch } from 'vue'
import { BOOK_GENRES } from '@/types/book'

import { getAllPublishers } from '@/services/publisher.service'
import { getBooks } from '@/services/book.service'

import type { Publisher } from '@/services/publisher.service'
import type { Book } from '@/types/book'

import BookCard from '@/components/common/book-card.vue'

const books = ref<Book[]>([])
const publishers = ref<Publisher[]>([])

const selectedGenre = ref(null)
const selectedPublisher = ref<string | null>(null)

// const genres = ref(BOOK_GENRES)
const genres = [
  "Tiểu thuyết",
  "Marketing - Bán hàng",
  "Kỹ năng sống",
  "Tâm lý"
]

const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
})

const isFetchingBooks = ref(false)

const fetchBooks = async (args?: {
  genre?: (typeof BOOK_GENRES)[number]
  publisher?: string
  query?: string
  page?: number
  limit?: number
}) => {
  try {
    isFetchingBooks.value = true
    const queries: any = {}
    if (args?.genre) queries.genre = args.genre
    if (args?.publisher) queries.publisher = args.publisher
    if (args?.query) queries.query = args.query
    if (args?.page) queries.page = args.page
    if (args?.limit) queries.limit = args.limit

    const response: any = await getBooks(queries)
    books.value = response.data.list || []
    pagination.value = response.data.pagination
  } catch (error) {
    console.error('Error fetching books:', error)
  } finally {
    isFetchingBooks.value = false
  }
}

watch([selectedGenre, selectedPublisher], async ([newGenre, newPublisher]) => {
  try {
    const filters: { genre?: (typeof BOOK_GENRES)[number]; publisher?: string } = {}
    if (newGenre) filters.genre = newGenre
    if (newPublisher) filters.publisher = newPublisher

    await fetchBooks(filters)
  } catch (error) {
    console.error('Error fetching books with filters:', error)
  }
})

const onPageChange = (event: any) => {
  pagination.value.page = event.page
  pagination.value.limit = event.rows
  fetchBooks({ page: event.page, limit: event.rows })
}

onMounted(async () => {
  try {
    await fetchBooks()

    const publishersResponse = await getAllPublishers()
    publishers.value = publishersResponse.data.list || []
  } catch (error) {
    console.error('Error fetching publishers:', error)
  }
})
</script>
<template>
  <div class="flex flex-col gap-3 p-11">
    <div class="flex flex-row justify-end gap-3">
      <Select
        v-model="selectedPublisher"
        :options="publishers"
        optionLabel="name"
        optionValue="_id"
        placeholder="Chọn nhà xuất bản"
        show-clear
      />
      <Select v-model="selectedGenre" :options="genres" placeholder="Chọn thể loại" show-clear>
        <template #option="slotProps">
          <span class="capitalize">{{ slotProps.option }}</span>
        </template>
        <template #value="slotProps">
          <span class="capitalize">{{ slotProps.value || 'Chọn thể loại' }}</span>
        </template>
      </Select>
    </div>

    <!-- <div class="grid grid-cols-5 xl:grid-cols-6 gap-4">
      <BookCard v-for="book in books" :key="book._id" :book="book" />
    </div> -->

    <div v-if="isFetchingBooks" class="flex flex-col items-center justify-center h-full">
      <ProgressSpinner style="width: 40px; height: 40px" stroke-width="4" animation-duration="1s" />
      <p class="text-gray-500 mt-3 text-sm">Đang tải tin nhắn...</p>
    </div>

    <!-- Books Grid -->
    <div v-else-if="books.length > 0" class="grid grid-cols-5 gap-4">
      <BookCard v-for="book in books" :key="book._id" :book="book" />
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-16 text-center">
      <div class="text-gray-300 mb-6">
        <i class="pi pi-search text-8xl"></i>
      </div>
      <h3 class="text-2xl font-semibold text-gray-600 mb-3">Không tìm thấy sách</h3>
      <p class="text-gray-500 text-lg mb-6">
        Không có sách nào phù hợp với bộ lọc của bạn. Thử thay đổi tiêu chí tìm kiếm.
      </p>
      <button
        @click="
          () => {
            selectedGenre = null
            selectedPublisher = null
          }
        "
        class="bg-(--my-primary-color) text-white px-6 py-3 rounded-lg font-medium hover:bg-(--my-primary-color)/90 transition-colors"
      >
        <i class="pi pi-refresh mr-2"></i>
        Xóa bộ lọc
      </button>
    </div>

    <Paginator
      v-if="books.length > 0"
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
