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

export const borrowBook = async (bookId: string) => {
  try {
    const response = await apiClient.post('/book/register-borrow', { bookId })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getMyBorrowings = async () => {
  try {
    const response = await apiClient.get('/book/my-borrowings')
    return response.data
  } catch (error) {
    throw error
  }
}

// export const getBorrows
