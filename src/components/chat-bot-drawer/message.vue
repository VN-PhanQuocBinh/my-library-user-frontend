<script setup lang="ts">
import type { Book } from '@/types/book'
import { RouterLink } from 'vue-router'
import { useChatbotStore } from '@/stores/chatbot'

export interface MessageProps {
  role?: 'user' | 'bot'
  content: string
  data?: { books?: Book[] } | null
}

const { role, content, data } = defineProps<MessageProps>()
const { closeChatbot } = useChatbotStore()
</script>

<template>
  <div
    :class="[
      'bg-gray-100 px-4 py-2 rounded-lg mb-2 max-w-[80%]',
      { 'bg-(--my-secondary-color)! text-white self-end': role === 'user' },
    ]"
  >
    <slot></slot>
  </div>
  <div>
    <div v-if="data && data.books" class="mt-2 flex flex-col gap-3 sm:grid-cols-2">
      <RouterLink
        v-for="(book, index) in data.books"
        :to="`/books/${book._id}`"
        :key="index"
        class="border border-gray-300 rounded-lg p-2 gap-3 flex flex-row items-center max-w-4/5"
        @click="closeChatbot()"
      >
        <img
          :src="book.coverImage.url"
          :alt="book.name"
          class="w-10 aspect-2/3 object-cover rounded"
        />
        <div class="flex flex-col items-start">
          <h3
            v-tooltip.top="{ value: book.name, showDelay: 500 }"
            class="text-lg font-semibold mb-2 text-center 1 line-clamp-1"
          >
            {{ book.name }}
          </h3>
          <p class="text-gray-600 text-center">by {{ book.author }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
