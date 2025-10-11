<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import { InputText } from 'primevue'
import { useDebounce } from '@/utils/use-debounce'
import type { Book } from '@/types/book'
import { getBooks } from '@/services/book.service'

const props = defineProps({ open: Boolean })
const emit = defineEmits(['update:open'])

const searchValue = ref<string>('')
const [debouncedSearchValue, setDebouncedSearchValue] = useDebounce(searchValue.value, 300)
const searchResults = ref<Book[]>([])
const isAnimated = ref(false)

watch(searchValue, (newValue) => {
   setDebouncedSearchValue(newValue)
})

watch(debouncedSearchValue, async () => {
   const newSearchValue = debouncedSearchValue.value.trim()
   try {
      if (newSearchValue.length > 0) {
         const books = await getBooks({ query: newSearchValue })
         searchResults.value = books.data.list
      } else {
         searchResults.value = []
      }
   } catch (error) {
      console.error('Error fetching search results:', error)
   }
})

// Watch để trigger animation khi mở
watch(
   () => props.open,
   async (newVal) => {
      if (newVal) {
         isAnimated.value = false
         await nextTick()
         // Trigger animation sau khi element render
         setTimeout(() => {
            isAnimated.value = true
            document.getElementById('search-input')?.focus()
         }, 10)
      } else {
         isAnimated.value = true
         await nextTick()
         setTimeout(() => {
            isAnimated.value = false
         }, 200) // Match với duration của transition
      }
   },
)

const closeDialog = () => {
   isAnimated.value = false
   setTimeout(() => {
      emit('update:open', false)
   }, 200)
}

</script>

<template>
   <div
      v-show="open"
      @click="closeDialog"
      class="z-[101] fixed inset-0 bg-black/10 backdrop-blur-xs flex items-start justify-center p-4"
   >
      <div
         :data-visible="isAnimated"
         @click.stop
         class="flex flex-col bg-white w-full max-w-2xl rounded-lg p-6 mt-20 shadow-lg transition-all duration-200 data-[visible=false]:scale-90 data-[visible=true]:scale-100"
      >
         <!-- Search Input -->
         <div
            class="flex items-center px-4 rounded-full bg-gray-100 border focus-within:border-(--my-primary-color) transition mb-4"
         >
            <i class="pi pi-search text-gray-400" style="font-size: 1rem" />
            <InputText
               id="search-input"
               v-model="searchValue"
               placeholder="Search books..."
               unstyled
               class="flex-1 outline-none text-gray-800 px-3 py-2 bg-transparent"
            />
         </div>

         <div class="flex-1 overflow-y-auto max-h-96">
            <div v-if="!searchValue" class="text-center text-gray-500 py-8">
               Start typing to search for books...
            </div>
            <div
               v-else-if="debouncedSearchValue && searchResults.length === 0"
               class="text-gray-500"
            >
               No results found for "{{ debouncedSearchValue }}"
            </div>
            <ul v-else class="space-y-2">
               <li
                  v-for="book in searchResults"
                  :key="book._id"
                  class="p-2 border-b border-gray-200 hover:bg-gray-50 rounded transition"
               >
                  <router-link
                     :to="`/books/${book._id}`"
                     class="flex items-center gap-4"
                     @click="emit('update:open', false)"
                  >
                     <img
                        :src="book.coverImage.url"
                        alt="Book Cover"
                        class="w-12 h-16 object-cover rounded"
                     />
                     <div>
                        <h3 class="font-semibold text-gray-800 text-xl">{{ book.name }}</h3>
                        <p class="text-sm text-gray-400 font-semibold">by {{ book.author }}</p>
                     </div>
                  </router-link>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>
