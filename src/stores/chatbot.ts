import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChatMessage } from '@/types/chatbot'

export const useChatbotStore = defineStore('chatbot', () => {
  const isOpen = ref(false)
  const messages = ref<ChatMessage[]>([])
  const isTyping = ref(false)

  const openChatbot = () => {
    isOpen.value = true
  }

  const closeChatbot = () => {
    isOpen.value = false
  }

  const toggleChatbot = () => {
    isOpen.value = !isOpen.value
  }

  const sendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    }
    messages.value.push(userMessage)

    isTyping.value = true
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `Bot response to: ${content}`,
        sender: 'bot',
        timestamp: new Date(),
      }
      messages.value.push(botMessage)
      isTyping.value = false
    }, 1000)
  }

  return {
    isOpen,
    messages,
    isTyping,
    openChatbot,
    closeChatbot,
    toggleChatbot,
    sendMessage,
  }
})
