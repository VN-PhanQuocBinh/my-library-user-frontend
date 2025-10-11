export type User = {
   _id: string
   firstname: string
   lastname: string
   gender: 'male' | 'female' | 'other'
   status: 'active' | 'inactive' | 'banned'
   dateOfBirth: Date
   phoneNumber: string
   email: string
   address: string
}
