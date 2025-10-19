import { z } from 'zod'

export const LoginSchema = z.object({
   email: z.string().email('Địa chỉ email không hợp lệ'),
   password: z.string().min(1, 'Mật khẩu phải có ít nhất 1 ký tự'),
})

export const RegisterSchema = z.object({
   firstname: z.string().min(1, 'Tên là bắt buộc'),
   lastname: z.string().min(1, 'Họ là bắt buộc'),
   email: z.string().email('Địa chỉ email không hợp lệ'),
   password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
   gender: z.enum(['male', 'female', 'other'], 'Giới tính phải là nam, nữ hoặc khác'),
   dateOfBirth: z.date().refine((date) => date <= new Date(), {
      message: 'Ngày sinh phải là trong quá khứ',
   }),
   address: z.string().min(1, 'Địa chỉ là bắt buộc'),
   phoneNumber: z.string().min(1, 'Số điện thoại là bắt buộc'),
})

export const EditProfileSchema = RegisterSchema.omit({ email: true, password: true })
export type LoginType = z.infer<typeof LoginSchema>
export type RegisterType = z.infer<typeof RegisterSchema>
export type UpdateProfileType = Omit<RegisterType, 'email' | 'password'>
export type EditProfileType = z.infer<typeof EditProfileSchema>
