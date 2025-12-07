import { defineStore } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import type { ChatMessage } from '@/types/chatbot'
import {
  fetchConversation,
  sendMessageToConversation,
  createConversation,
  fetchUserConversations,
  renameConversation as renameConversationService,
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

  const initializeChatbot = async () => {
    if (!authStore.isAuthenticated) return

    const currentConversationId = getConversationId()
    if (!currentConversationId) {
      await createNewConversation()
    } else {
      await getConversationMessages(currentConversationId)
    }

    await getConversationHistory()
  }

  watch(
    () => authStore.isAuthenticated,
    async () => {
      if (authStore.isAuthenticated) {
        await initializeChatbot()
      } else {
        clearStoredConversationId()
        currentConversation.value = null
        conversationHistory.value = []
      }
    },
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
      throw error
    } finally {
      isSendingMessage.value = false
    }
  }

  const updateConversation = (data: ConversationResponse) => {
    currentConversation.value = {
      conversationId: data._id,
      title: data.title,
      user: data.user,
      messages: data.messages ? data.messages : currentConversation.value?.messages || [],
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
      const data = await createConversation()

      updateConversation({ ...data, messages: [] })
      conversationHistory.value.push(data)
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

  const renameConversation = async (newTitle: string) => {
    if (!currentConversation.value) return
    try {
      const data = await renameConversationService(
        currentConversation.value.conversationId,
        newTitle,
      )

      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Đổi tên cuộc trò chuyện thành công.',
        life: 3000,
      })

      updateConversation(data)
      await getConversationHistory()
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Đổi tên cuộc trò chuyện thất bại. Vui lòng thử lại.',
        life: 3000,
      })
    }
  }

  onMounted(async () => {
    await initializeChatbot()
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
    createNewConversation,
    renameConversation,
  }
})
