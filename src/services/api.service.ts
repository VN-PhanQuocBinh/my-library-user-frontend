import axios, { type AxiosInstance } from 'axios'
import { useAuthStore } from '@/stores/auth'

const apiClient: AxiosInstance = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
   headers: {
      'Content-Type': 'application/json',
   },
   timeout: 10000,
})

apiClient.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('token')
      if (token) {
         config.headers.Authorization = `Bearer ${token}`
      }

      return config
   },
   (error) => {
      return Promise.reject(error)
   },
)

apiClient.interceptors.response.use(
   (response) => {
      return response
   },
   (error) => {
      const { status } = error.response

      switch (status) {
         case 401: {
            console.error('Unauthorized access - perhaps redirect to login?')
         }
         case 403: {
            const authStore = useAuthStore()
            authStore.logout()
            break
         }
         default:
            console.error('API error:', error.response.data)
      }
      return Promise.reject(error)
   },
)

export default apiClient
