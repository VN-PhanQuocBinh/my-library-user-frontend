export const formatCurrency = (value: number) => {
   if (value < 0) return '0 đ'

   return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
   }).format(value)
}
