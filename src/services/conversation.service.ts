import apiClient from './api.service'
import type { CONVERSATION_MESSAGE_TYPE, ConversationResponse } from '@/types/chatbot'

export async function fetchConversation(conversationId: string): Promise<ConversationResponse> {
  try {
    const response = await apiClient.get(`/conversation/${conversationId}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export async function createConversation(): Promise<ConversationResponse> {
  try {
    const response = await apiClient.post(`/conversation/create`)
    return response.data.data
  } catch (error) {
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
    throw error
  }
}

export async function fetchUserConversations(userId: string): Promise<ConversationResponse[]> {
  try {
    const response = await apiClient.get(`/conversation/list`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export async function renameConversation(
  conversationId: string,
  newTitle: string,
): Promise<ConversationResponse> {
  try {
    const response = await apiClient.patch(`/conversation/rename/${conversationId}`, {
      newTitle,
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}
