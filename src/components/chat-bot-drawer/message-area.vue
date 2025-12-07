<script setup lang="ts">
import { nextTick, onMounted, toRefs, watch } from 'vue'
import Message from './message.vue'
import type { ChatMessage } from '@/types/chatbot'
import 'highlight.js/styles/monokai.css'
import Markdown from 'vue3-markdown-it'
import { ref } from 'vue'
import { useChatbotStore } from '@/stores/chatbot'
import ProgressSpinner from 'primevue/progressspinner'

interface MessageAreaProps {
  class?: string
  messages: ChatMessage[]
}

const props = defineProps<MessageAreaProps>()
const chatbotStore = useChatbotStore()
const messageContainer = ref<HTMLDivElement | null>(null)

const scrollToBottom = (smooth = true) => {
  if (messageContainer.value) {
    // messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    messageContainer.value.scrollTo({
      top: messageContainer.value.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto',
    })
    console.log('Scrolled to bottom')
  }
}

watch(
  () => props.messages,
  () => {
    nextTick(() => {
      scrollToBottom()
    })
  },
  { deep: true },
)

onMounted(() => {
  nextTick(() => {
    scrollToBottom(false)
  })
})
</script>

<template>
  <div ref="messageContainer" :class="['w-full overflow-y-auto py-4 hide-scrollbar', props.class]">
    <div
      v-if="chatbotStore.isFetchingMessages"
      class="flex flex-col items-center justify-center h-full"
    >
      <ProgressSpinner style="width: 40px; height: 40px" stroke-width="4" animation-duration="1s" />
      <p class="text-gray-500 mt-3 text-sm">Đang tải tin nhắn...</p>
    </div>

    <div
      v-else-if="props.messages.length === 0"
      class="flex flex-col items-center justify-center h-full text-center px-6"
    >
      <div class="text-gray-300 mb-4">
        <i class="pi pi-comments text-6xl" :style="{ fontSize: '5rem' }"></i>
      </div>
      <h3 class="text-xl font-semibold text-gray-600 mb-2">Chào mừng đến với My Library!</h3>
      <p class="text-gray-500 text-sm mb-4 max-w-xs leading-relaxed">
        Hỏi tôi về sách, tác giả, hoặc bất cứ điều gì bạn muốn tìm hiểu trong thư viện.
      </p>
      <div class="grid grid-cols-1 gap-2 w-full max-w-sm">
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-3 text-left">
          <i class="text-sm font-medium pi pi-lightbulb text-yellow-600"></i> Gợi ý:
          <p class="text-sm text-gray-500 mt-1">"Tiểu thuyết Mưa đỏ"</p>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-3 text-left">
          <i class="text-sm font-medium pi pi-search text-blue-800"></i> Tìm kiếm:
          <p class="text-sm text-gray-500 mt-1">"Sách của tác giả Chu Lai"</p>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-3 text-left">
          <i class="text-sm font-medium pi pi-info-circle text-green-700"></i> Thông tin:
          <p class="text-sm text-gray-500 mt-1">"Cách mượn sách tại thư viện"</p>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col gap-2">
      <Message
        v-for="(msg, index) in props.messages"
        :key="index"
        :role="msg.role === 'user' ? 'user' : 'bot'"
        :data="msg.data"
      >
        <Markdown :source="msg.content" />
      </Message>

      <div v-if="chatbotStore.isSendingMessage" class="flex gap-1">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Đảm bảo ordered lists hiển thị số thứ tự */
:deep(ol) {
  list-style-type: decimal !important;
  margin-left: 1.5rem !important;
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

:deep(ol li) {
  display: list-item !important;
  list-style: decimal !important;
  margin-bottom: 0.25rem !important;
}

/* Đảm bảo unordered lists hiển thị dấu đầu dòng */
:deep(ul) {
  list-style-type: disc !important;
  margin-left: 1.5rem !important;
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

:deep(ul li) {
  display: list-item !important;
  list-style: disc !important;
  margin-bottom: 0.25rem !important;
}

/* Nested lists */
:deep(ol ol) {
  list-style-type: lower-alpha !important;
}

:deep(ol ol ol) {
  list-style-type: lower-roman !important;
}

:deep(ul ul) {
  list-style-type: circle !important;
}

:deep(ul ul ul) {
  list-style-type: square !important;
}

.typing-dot {
  width: 6px;
  height: 6px;
  background-color: currentColor;
  border-radius: 50%;
  animation: typing 1.4s ease-in-out infinite;
}

.typing-dot:nth-child(1) {
  animation-delay: 0s;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}
</style>
