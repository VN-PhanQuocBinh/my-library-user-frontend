<script setup lang="ts">
const bookGenres = [
   // Icon PrimeVue Icons: pi pi-{tên_icon}
   { id: 1, label: 'Science Fiction', icon: 'pi pi-compass', color: '#2563eb' }, // pi-compass (La bàn/Khám phá) hoặc pi-globe
   { id: 2, label: 'Fantasy', icon: 'pi pi-star', color: '#9333ea' }, // pi-star (Sao/Phép thuật)
   { id: 3, label: 'Mystery', icon: 'pi pi-question-circle', color: '#374151' }, // pi-question-circle (Dấu hỏi/Bí ẩn)
   { id: 4, label: 'Romance', icon: 'pi pi-heart', color: '#dc2626' }, // pi-heart-fill (Trái tim đầy)
   { id: 5, label: 'Horror', icon: 'pi pi-exclamation-triangle', color: '#7f1d1d' }, // pi-exclamation-triangle (Cảnh báo/Kinh dị)
   { id: 6, label: 'Thriller', icon: 'pi pi-bolt', color: '#ca8a04' }, // pi-bolt (Tia sét/Kịch tính)
   { id: 7, label: 'Historical Fiction', icon: 'pi pi-history', color: '#b45309' }, // pi-history (Lịch sử)
   { id: 8, label: 'Non-Fiction', icon: 'pi pi-file', color: '#059669' }, // pi-file (Tài liệu/Phi hư cấu)
   { id: 9, label: 'Biography', icon: 'pi pi-user-plus', color: '#4f46e5' }, // pi-user-plus (Người dùng/Tiểu sử)
   { id: 10, label: 'Self-Help', icon: 'pi pi-lightbulb', color: '#ea580c' }, // pi-lightbulb (Bóng đèn/Ý tưởng)
   { id: 11, label: 'Health & Wellness', icon: 'pi pi-shield', color: '#059669' }, // pi-shield (Lá chắn/Sức khỏe)
   { id: 12, label: 'Travel', icon: 'pi pi-map', color: '#0d9488' }, // pi-map (Bản đồ)
   { id: 13, label: 'Cooking', icon: 'pi pi-shopping-bag', color: '#dc2626' }, // pi-utensils (Dụng cụ ăn/Nấu ăn)
   { id: 14, label: 'Art & Photography', icon: 'pi pi-image', color: '#7c3aed' }, // pi-image (Hình ảnh/Nghệ thuật)
   { id: 15, label: 'Poetry', icon: 'pi pi-pen-to-square', color: '#e11d48' }, // pi-pen-to-square (Viết/Thơ ca)
]
</script>

<template>
   <section class="container mx-auto py-16 px-11">
      <div class="text-center">
         <h2 class="text-3xl text-(--my-secondary-color) font-bold text-center mb-4!">Explore by Category and Subject</h2>
         <p>
            Narrow down your search instantly and find the perfect read among our diverse range of
            subjects
         </p>
      </div>
      <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
         <div v-for="genre in bookGenres" :key="genre.id" class="flex items-center justify-center rounded-xl bg-gray-100 p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <i :class="`${genre.icon} mr-4`" :style="{ color: genre.color, fontSize: '1.5rem' }"></i>
            <span class="text-lg text-gray-800 font-semibold">{{ genre.label }}</span>
         </div>
      </div>
   </section>
</template>
