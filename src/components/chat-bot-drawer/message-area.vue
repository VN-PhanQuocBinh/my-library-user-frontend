<script setup lang="ts">
import { nextTick, onMounted, toRefs, watch } from 'vue'
import Message from './message.vue'
import type { ChatMessage } from '@/types/chatbot'
import 'highlight.js/styles/monokai.css'
import Markdown from 'vue3-markdown-it'
import { ref } from 'vue'

interface MessageAreaProps {
  class?: string
  messages: ChatMessage[]
}

const props = defineProps<MessageAreaProps>()

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
    <div class="flex flex-col gap-2">
      <Message
        v-for="(msg, index) in props.messages"
        :key="index"
        :role="msg.role === 'user' ? 'user' : 'bot'"
        :content="msg.content"
        :data="msg.data"
      >
        <Markdown :source="msg.content" />
      </Message>
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
</style>
