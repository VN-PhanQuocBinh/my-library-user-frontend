import apiClient from './api.service'
import type { RegisterType, UpdateProfileType } from '@/types/auth-schema'

export const login = async (payload: { email: string; password: string }) => {
   try {
      const response = await apiClient.post('/auth/login', payload)
      return response.data
   } catch (error) {
      throw error
   }
}

export const register = async (payload: RegisterType) => {
   try {
      const response = await apiClient.post('/auth/register', payload)
      return response.data
   } catch (error) {
      throw error
   }
}

export const logout = async () => {
   try {
      const response = await apiClient.post('/auth/logout')
      return response.data
   } catch (error) {
      throw error
   }
}
export const getProfile = async () => {
   try {
      const response = await apiClient.get('/auth/profile')
      return response.data
   } catch (error) {
      throw error
   }
}

export const updateProfile = async (id: string, payload: Partial<UpdateProfileType>) => {
   try {
      const response = await apiClient.patch(`/auth/profile/${id}`, payload)
      return response.data
   } catch (error) {
      throw error
   }
}
