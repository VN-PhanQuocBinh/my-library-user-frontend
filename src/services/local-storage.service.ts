export const storeConversationId = (conversationId: string) => {
  localStorage.setItem('currentConversationId', conversationId)
}

export const clearStoredConversationId = () => {
  localStorage.removeItem('currentConversationId')
}

export const getConversationId = () => {
  return localStorage.getItem('currentConversationId')
}
