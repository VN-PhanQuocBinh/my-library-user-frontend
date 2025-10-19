<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Button, Tag, Card, Toast } from 'primevue'
import { useToast } from 'primevue/usetoast'

import Dialog from 'primevue/dialog'

import type { Book } from '@/types/book'
import { getBookById, borrowBook } from '@/services/book.service'

import Galleria from 'primevue/galleria'

import Image from 'primevue/image'

const route = useRoute()
const book = ref<Book | null>(null)
const loading = ref(true)
const error = ref('')
const dialogVisible = ref(false)
const borrowing = ref(false)

const toast = useToast()

// Sample data structure - replace with actual API call
const fetchBookDetail = async () => {
   try {
      const bookId = route.params.id as string
      const response: any = await getBookById(bookId)
      book.value = response.data || null
   } catch (err) {
      error.value = 'Failed to load book details'
      console.error('Error fetching book:', err)
   } finally {
      loading.value = false
   }
}

const handleBorrow = async () => {
   try {
      borrowing.value = true
      const bookId = book.value?._id
      if (!bookId) {
         toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User or Book ID is missing',
            life: 3000,
         })
         return
      }

      await borrowBook(bookId)
      dialogVisible.value = false
      toast.add({
         severity: 'success',
         summary: 'Success',
         detail: 'Book borrowed successfully',
         life: 3000,
      })
   } catch (error: any) {
      console.error('Error borrowing book:', error)
      toast.add({
         severity: 'error',
         summary: 'Error',
         detail: error?.response?.data?.message || 'Failed to borrow book',
         life: 3000,
      })
   } finally {
      borrowing.value = false
   }
}

onMounted(() => {
   fetchBookDetail()
})
</script>

<template>
   <div class="book-detail-container p-6 max-w-6xl mx-auto">
      <Toast position="bottom-right" />

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
         <i class="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center text-red-500 p-8">
         <i class="pi pi-exclamation-triangle text-4xl mb-4"></i>
         <p>{{ error }}</p>
      </div>

      <!-- Book Detail Content -->
      <div v-else-if="book" class="flex flex-row justify-center gap-8">
         <!-- Book Cover -->
         <div>
            <Galleria
               :value="[book.coverImage.url, ...book.detailedImages.map((img) => img.url)]"
               :numVisible="4"
               containerClass="w-[400px] aspect-[3/5]"
            >
               <template #item="slotProps">
                  <img :src="slotProps.item" class="h-[550px]! object-cover" />
               </template>
               <template #thumbnail="slotProps">
                  <img :src="slotProps.item" class="max-h-14!" />
               </template>
            </Galleria>
         </div>

         <!-- Book Information -->
         <div class="lg:col-span-2 space-y-6">
            <Tag :value="book.genre" severity="info" class="text-sm rounded-full! capitalize" />
            <h1 class="text-5xl font-semibold text-gray-700">{{ book.name }}</h1>

            <div class="text-gray-700 mt-4">
               <p><strong>Tác giả:</strong> {{ book.author }}</p>
               <p><strong>Nhà xuất bản:</strong> {{ book.publisher.name }}</p>
               <p>
                  <strong>Ngày xuất bản:</strong>
                  {{ new Date(book.publishedDate).toLocaleDateString() }}
               </p>

               <div class="divider h-[1px] w-full bg-gray-200 my-3"></div>

               <p class="mt-2"><strong>Mô tả:</strong></p>
               <p class="mt-1">{{ book.description }}</p>
            </div>
            
            <div class="divider h-[1px] w-full bg-gray-200 my-3"></div>

            <div class="flex flex-row items-center gap-4">
               <div class="px-3 py-2 rounded-sm bg-blue-50 text-blue-900 font-semibold h-full">
                  {{ book.quantity }} Còn lại
               </div>
               <div
                  class="size-9 text-gray-500 hover:text-white hover:bg-red-500 hover:border-none border border-gray-500 rounded-[6px] grid place-items-center transition-all"
               >
                  <i class="pi pi-heart" title="Book status"></i>
               </div>

               <Button
                  label="Mượn sách"
                  icon="pi pi-book"
                  class="bg-(--my-secondary-color)! text-white! hover:opacity-80 border-none!"
                  :disabled="!book.status || book.quantity === 0"
                  @click="dialogVisible = true"
               />
            </div>
         </div>

         <Dialog header="Mượn sách" v-model:visible="dialogVisible" modal>
            <p>Bạn có chắc chắn muốn mượn cuốn sách này không?</p>
            <div class="flex justify-end gap-3 mt-4">
               <Button
                  label="Hủy"
                  icon="pi pi-times"
                  severity="secondary"
                  class="p-button-text"
                  @click="dialogVisible = false"
               />
               <Button
                  label="Xác nhận"
                  icon="pi pi-check"
                  class="bg-(--my-secondary-color)! hover:opacity-80 border-none! text-white!"
                  @click="
                     () => {
                        handleBorrow()
                        dialogVisible = false
                     }
                  "
                  :loading="borrowing"
                  :disabled="borrowing"
               />
            </div>
         </Dialog>
      </div>
   </div>
</template>

<style scoped>
.book-detail-container {
   min-height: calc(100vh - 200px);
}

/* Custom button styling to match design */
:deep(.p-button.bg-yellow-500) {
   background-color: #eab308;
   border-color: #eab308;
   color: white;
}

:deep(.p-button.bg-yellow-500:hover) {
   background-color: #d97706;
   border-color: #d97706;
}

:deep(.p-button:disabled) {
   opacity: 0.5;
   cursor: not-allowed;
}

:deep(.p-galleria-items) {
   height: 550px;
}
</style>
