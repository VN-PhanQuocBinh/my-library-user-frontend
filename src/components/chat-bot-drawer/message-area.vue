<script setup lang="ts">
import { computed, toRefs } from 'vue'
import Message from './message.vue'
import type { ChatMessage } from '@/types/chatbot'
import 'highlight.js/styles/monokai.css'
import Markdown from 'vue3-markdown-it'

interface MessageAreaProps {
  class?: string
  messages: ChatMessage[]
}

const props = defineProps<MessageAreaProps>()
</script>

<template>
  <div :class="['w-full overflow-y-auto hide-scrollbar', props.class]">
    <div class="max-h-full flex flex-col gap-2">
      <Message
        v-for="(msg, index) in props.messages"
        :key="index"
        :role="msg.role === 'user' ? 'user' : 'bot'"
        :content="msg.content"
      >
        <Markdown :source="msg.content" />
      </Message>
    </div>
  </div>
</template>
