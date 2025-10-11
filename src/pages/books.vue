<script setup lang="ts">
import { Select } from 'primevue'
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

const fetchBooks = async (args?: {
   genre?: (typeof BOOK_GENRES)[number]
   publisher?: string
   query?: string
}) => {
   try {
      const queries: any = {}
      if (args?.genre) queries.genre = args.genre
      if (args?.publisher) queries.publisher = args.publisher
      if (args?.query) queries.query = args.query

      const response: any = await getBooks(queries)
      books.value = response.data.list || []
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
      <div class="grid grid-cols-5 gap-4">
         <BookCard v-for="book in books" :key="book._id" :book="book" />
      </div>
   </div>
</template>
