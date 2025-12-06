<script setup lang="ts">
import { Select } from 'primevue'

import Paginator from 'primevue/paginator'

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

const genres = ref(BOOK_GENRES)

const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
})

const fetchBooks = async (args?: {
  genre?: (typeof BOOK_GENRES)[number]
  publisher?: string
  query?: string
  page?: number
  limit?: number
}) => {
  try {
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
        placeholder="Select a publisher"
        show-clear
      />
      <Select v-model="selectedGenre" :options="genres" placeholder="Select a genre" show-clear>
        <template #option="slotProps">
          <span class="capitalize">{{ slotProps.option }}</span>
        </template>
        <template #value="slotProps">
          <span class="capitalize">{{ slotProps.value || 'Select a genre' }}</span>
        </template>
      </Select>
    </div>
    <div class="grid grid-cols-5 xl:grid-cols-6 gap-4">
      <BookCard v-for="book in books" :key="book._id" :book="book" />
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
