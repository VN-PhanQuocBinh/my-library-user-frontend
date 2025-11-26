import apiClient from './api.service'
import type { CONVERSATION_MESSAGE_TYPE } from '@/types/chatbot'

export async function fetchConversation(conversationId: string) {
  try {
    const response = await apiClient.get(`/conversation/${conversationId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching conversation messages:', error)
    throw error
  }
}

export async function sendMessageToConversation({
  conversationId,
  message,
  type,
}: {
  conversationId: string
  message: string
  type: CONVERSATION_MESSAGE_TYPE
}) {
  try {
    const response = await apiClient.post(`/conversation/add-message`, {
      conversationId,
      message,
      type,
    })
    return response.data
  } catch (error) {
    console.error('Error sending message to conversation:', error)
    throw error
  }
}
