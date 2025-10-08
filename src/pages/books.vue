<script setup lang="ts">
import { Select } from 'primevue'
import { onMounted, reactive, ref } from 'vue'
import { BOOK_GENRES } from '@/types/book'

import { getAllPublishers } from '@/services/publisher.service'
import type { Publisher } from '@/services/publisher.service'

import BookCard from '@/components/common/book-card.vue'

const publishers = ref<Publisher[]>([])

const selectedGenre = ref(null)
const selectedPublisher = ref<Publisher>()

const genres = ref(BOOK_GENRES)

onMounted(async () => {
   try {
      const response = await getAllPublishers()
      publishers.value = response.data.list || []
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
         <BookCard v-for="n in 10" :key="n" />
      </div>
   </div>
</template>
