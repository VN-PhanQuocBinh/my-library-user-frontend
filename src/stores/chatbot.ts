import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { ChatMessage } from '@/types/chatbot'
import { fetchConversation, sendMessageToConversation } from '@/services/conversation.service'
import type { CONVERSATION_MESSAGE_TYPE } from '@/types/chatbot'
import { useAuthStore } from './auth'

interface Conversation {
  conversationId: string
  user: string
  messages: ChatMessage[]
}

export const useChatbotStore = defineStore('chatbot', () => {
  const authStore = useAuthStore()
  const isOpen = ref(false)
  const currentConversation = ref<Conversation | null>({
    conversationId: '',
    user: authStore.user?._id || '',
    messages: [],
  })
  const isSendingMessage = ref(false)
  const isFetchingMessages = ref(false)

  const openChatbot = () => {
    isOpen.value = true
  }

  const closeChatbot = () => {
    isOpen.value = false
  }

  const toggleChatbot = () => {
    isOpen.value = !isOpen.value
  }

  const sendMessage = async ({
    content,
    type = 'SYSTEM_INFO',
  }: {
    content: string
    type: CONVERSATION_MESSAGE_TYPE
  }) => {
    const userMessage: ChatMessage = {
      role: 'user',
      content,
      timestamp: new Date(),
    }
    currentConversation.value?.messages.push(userMessage)

    try {
      isSendingMessage.value = true

      const payload = {
        conversationId: currentConversation.value?.conversationId || '',
        message: content,
        type,
      }
      // Here you would typically call a service to send the message
      const responseMessage = await sendMessageToConversation(payload)
      currentConversation.value?.messages.push(responseMessage.data)
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      console.log('Finally sending messages')
      isSendingMessage.value = false
    }
  }

  const getConversationMessages = async (conversationId: string) => {
    try {
      isFetchingMessages.value = true
      const data = await fetchConversation(conversationId)
      currentConversation.value = data.data
    } catch (error) {
      console.error('Error fetching conversation messages:', error)
    } finally {
      isFetchingMessages.value = false
    }
  }

  onMounted(() => {
    getConversationMessages('690a23f8d231d9df42c1b30e')
  })

  return {
    isOpen,
    isSendingMessage,
    isFetchingMessages,
    currentConversation,
    openChatbot,
    closeChatbot,
    toggleChatbot,
    sendMessage,
    getConversationMessages,
  }
})
