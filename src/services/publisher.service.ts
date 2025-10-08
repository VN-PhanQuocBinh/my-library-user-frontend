import apiClient from './api.service'

export type Publisher = {
   _id?: string
   name: string
   address: string
}

type GetAllPublishersParams = {
   query?: string
   page?: number
   limit?: number
}

export const getAllPublishers = async (queries?: GetAllPublishersParams) => {
   try {
      const response = await apiClient.get('/publisher/list', {
         params: {
            ...queries,
         },
      })
      return response.data
   } catch (error) {
      console.error('Error fetching publishers:', error)
      throw error
   }
}
