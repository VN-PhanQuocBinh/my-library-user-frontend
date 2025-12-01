import type { Book } from './book'

export interface ChatMessage {
  id?: string
  role: 'user' | 'bot'
  content: string
  data?: {
    books?: Book[]
  }
  timestamp: Date
}

export type CONVERSATION_MESSAGE_TYPE = 'SYSTEM_INFO' | 'BOOK_RECOMMENDATION'

export interface ConversationResponse {
  _id: string
  title: string
  user: string
  messages?: ChatMessage[]
}
