import { defineStore } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import type { ChatMessage } from '@/types/chatbot'
import {
  fetchConversation,
  sendMessageToConversation,
  createConversation,
  fetchUserConversations,
} from '@/services/conversation.service'
import type { CONVERSATION_MESSAGE_TYPE } from '@/types/chatbot'
import { useAuthStore } from './auth'
import type { ConversationResponse } from '@/types/chatbot'

import {
  storeConversationId,
  getConversationId,
  clearStoredConversationId,
} from '@/services/local-storage.service'
import { useToast } from 'primevue'

interface Conversation {
  conversationId: string
  title: string
  user: string
  messages: ChatMessage[]
}

export const useChatbotStore = defineStore('chatbot', () => {
  const toast = useToast()
  const authStore = useAuthStore()
  const isOpen = ref(false)
  const currentConversation = ref<Conversation | null>({
    conversationId: '',
    title: '',
    user: authStore.user?._id || '',
    messages: [],
  })
  const conversationHistory = ref<ConversationResponse[]>([])

  // Loading states
  const isSendingMessage = ref(false)
  const isFetchingMessages = ref(false)

  watch(
    () => currentConversation.value?.conversationId,
    (newVal, oldVal) => {
      if (newVal && newVal !== oldVal) {
        storeConversationId(newVal)
      }
    },
    { deep: true },
  )

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
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to send message. Please try again.',
        life: 3000,
      })
    } finally {
      isSendingMessage.value = false
    }
  }

  const updateConversation = (data: ConversationResponse) => {
    currentConversation.value = {
      conversationId: data._id,
      title: data.title,
      user: data.user,
      messages: data.messages || [],
    }

    if (data._id) storeConversationId(data._id)
  }

  const getConversationMessages = async (conversationId: string) => {
    try {
      isFetchingMessages.value = true
      const data = await fetchConversation(conversationId)
      updateConversation(data)
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.code) {
        await createNewConversation()
      }
    } finally {
      isFetchingMessages.value = false
    }
  }

  const createNewConversation = async () => {
    try {
      isFetchingMessages.value = true
      const data = await createConversation()
      updateConversation(data)
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to create a new conversation. Please try again.',
        life: 3000,
      })
    }
  }

  const getConversationHistory = async () => {
    try {
      const data = await fetchUserConversations(authStore.user?._id || '')
      conversationHistory.value = data
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to fetch conversation history. Please try again.',
        life: 3000,
      })
    }
  }

  onMounted(async () => {
    const currentConversationId = getConversationId()
    if (!currentConversationId) {
      await createNewConversation()
    } else {
      await getConversationMessages(currentConversationId)
    }

    await getConversationHistory()
  })

  return {
    isOpen,
    isSendingMessage,
    isFetchingMessages,
    currentConversation,
    conversationHistory,
    openChatbot,
    closeChatbot,
    toggleChatbot,
    sendMessage,
    getConversationMessages,
  }
})
