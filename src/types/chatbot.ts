export interface ChatMessage {
  id?: string
  role: 'user' | 'bot'
  content: string
  data?: {
    books?: string[]
  }
  timestamp: Date
}

export type CONVERSATION_MESSAGE_TYPE = 'SYSTEM_INFO' | 'BOOK_RECOMMENDATION'
