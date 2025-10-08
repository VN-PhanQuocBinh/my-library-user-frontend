import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

export const LoginSchema = z.object({
   email: z.string().email('Invalid email address'),
   password: z.string().min(1, 'Password must be at least 1 characters long'),
})

export const RegisterSchema = z.object({
   firstname: z.string().min(1, 'Firstname is required'),
   lastname: z.string().min(1, 'Lastname is required'),
   email: z.string().email('Invalid email address'),
   password: z.string().min(6, 'Password must be at least 6 characters long'),
   gender: z.enum(['male', 'female', 'other'], 'Gender must be either male, female or other'),
   dateOfBirth: z.date().refine((date) => date <= new Date(), {
      message: 'Date of birth must be in the past',
   }),
   address: z.string().min(1, 'Address is required'),
   phoneNumber: z.string().min(1, 'Phone number is required'),
})

export type LoginType = z.infer<typeof LoginSchema>
export type RegisterType = z.infer<typeof RegisterSchema>
