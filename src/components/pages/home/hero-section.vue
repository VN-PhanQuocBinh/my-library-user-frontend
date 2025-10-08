<script setup lang="ts"></script>

<template>
   <div class="h-[600px] bg-blue-100 m-11 rounded-2xl">
      <div class="grid grid-cols-2 h-full">
         <div class="flex flex-col justify-center items-start p-12 gap-6">
            <h1 class="text-5xl font-bold text-gray-800">Mở cánh cửa vào Tương Lai Kiến Thức</h1>
            <p class="text-lg text-(--my-secondary-color)">
               Khám phá hàng ngàn tựa sách từ mọi lĩnh vực: Sách mới, Sách bán chạy và Những tác
               phẩm kinh điển.
            </p>
            <button
               class="group bg-(--my-primary-color) text-(my-secondary-color) font-semibold px-6 py-3 rounded-full transition flex flex-row items-center gap-2"
            >
               Xem toàn bộ sách
               <i class="pi pi-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </button>
         </div>
         <div class="flex justify-center items-center p-8">
            <div class="bg-gray-200 w-full h-full rounded-2xl grid place-items-center text-3xl">
               700x700
            </div>
         </div>
      </div>
   </div>
</template>
