<script setup lang="ts">
const bookGenres = [
   // Icon PrimeVue Icons: pi pi-{tên_icon}
   { id: 1, label: 'Khoa học viễn tưởng', icon: 'pi pi-compass', color: '#2563eb' },
   { id: 2, label: 'Giả tưởng', icon: 'pi pi-star', color: '#9333ea' },
   { id: 3, label: 'Bí ẩn', icon: 'pi pi-question-circle', color: '#374151' },
   { id: 4, label: 'Lãng mạn', icon: 'pi pi-heart', color: '#dc2626' },
   { id: 5, label: 'Kinh dị', icon: 'pi pi-exclamation-triangle', color: '#7f1d1d' },
   { id: 6, label: 'Giật gân', icon: 'pi pi-bolt', color: '#ca8a04' },
   { id: 7, label: 'Tiểu thuyết lịch sử', icon: 'pi pi-history', color: '#b45309' },
   { id: 8, label: 'Phi hư cấu', icon: 'pi pi-file', color: '#059669' },
   { id: 9, label: 'Tiểu sử', icon: 'pi pi-user-plus', color: '#4f46e5' },
   { id: 10, label: 'Phát triển bản thân', icon: 'pi pi-lightbulb', color: '#ea580c' },
   { id: 11, label: 'Sức khỏe & Đời sống', icon: 'pi pi-shield', color: '#059669' },
   { id: 12, label: 'Du lịch', icon: 'pi pi-map', color: '#0d9488' },
   { id: 13, label: 'Nấu ăn', icon: 'pi pi-shopping-bag', color: '#dc2626' },
   { id: 14, label: 'Nghệ thuật & Nhiếp ảnh', icon: 'pi pi-image', color: '#7c3aed' },
   { id: 15, label: 'Thơ ca', icon: 'pi pi-pen-to-square', color: '#e11d48' },
]
</script>

<template>
   <section class="container mx-auto py-16 px-11">
      <div class="text-center">
         <h2 class="text-4xl text-(--my-secondary-color) font-bold text-center mb-4!">
            Khám phá thể loại sách yêu thích của bạn
         </h2>
         <p>
            Thu hẹp tìm kiếm của bạn ngay lập tức và tìm đọc hoàn hảo trong danh mục đa dạng của chúng tôi
         </p>
      </div>
      <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
         <div
            v-for="genre in bookGenres"
            :key="genre.id"
            class="flex items-center justify-center rounded-xl bg-gray-100 p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            :style="{backgroundColor: `color-mix(in oklab, ${genre.color} 5%, transparent)`}"
         >
            <i
               :class="`${genre.icon} mr-4`"
               :style="{ color: genre.color, fontSize: '1.5rem' }"
            ></i>
            <span class="flex-1 text-lg text-gray-800 font-semibold line-clamp-2">{{ genre.label }}</span>
         </div>
      </div>
   </section>
</template>
