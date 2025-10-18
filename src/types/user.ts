export interface PenaltyRecord {
   amount?: number
   reason: string
   type: 'late-return' | 'lost-book' | 'other'
   banUntilDate?: Date
   borrowId?: string
   createdAt?: Date
}

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

   totalDebt: number
   currentBanUntil?: Date
   penaltyLog: PenaltyRecord[]

   // virtuals
   isBanned?: boolean
}
