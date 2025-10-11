import type { Book } from '@/types/book'
import apiClient from './api.service'

type GetBooksParams = {
   query?: string
   genre?: string
   publisher?: string
   page?: number
   limit?: number
}

export const getBooks = async (params?: GetBooksParams) => {
   console.log('Fetching books with params:', params)

   try {
      const response = await apiClient.get('/book/list', { params })

      return response.data
   } catch (error) {
      throw error
   }
}

export const getBookById = async (id: string): Promise<Book> => {
   try {
      const response = await apiClient.get(`/book/${id}`)
      return response.data
   } catch (error) {
      throw error
   }
}

export const borrowBook = async (userId: string, bookId: string) => {
   try {
      const response = await apiClient.post('/book/borrow', { userId, bookId })
      return response.data
   } catch (error) {
      throw error
   }
}
