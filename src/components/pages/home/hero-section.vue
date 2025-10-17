<script setup lang="ts"></script>

<template>
   <div class="h-[600px] relative overflow-hidden m-6 rounded-xl shadow-lg">
      <!-- <div class="relative h-full"> -->
      <div class="absolute inset-0 w-full h-full backdrop-blur-xs bg-black/10 z-20">
         <div class="h-ful w-full flex flex-col justify-center items-center p-12 mb-12 gap-6">
            <h1 class="text-5xl font-bold text-white text-center leading-tight flex flex-col gap-2">
               <div>MỞ CÁNH CỬA</div>
               <div>VÀO TƯƠNG LAI KIẾN THỨC</div>
            </h1>
            <p class="text-lg text-gray-100 flex flex-col items-center text-center max-w-2xl">
               <span>Khám phá hàng ngàn tựa sách từ mọi lĩnh vực: </span>
               <span>Sách mới, Sách bán chạy và Những tác phẩm kinh điển.</span>
            </p>
            <button
               class="group border border-(--my-primary-color) text-white hover:bg-(--my-primary-color) hover:text-(--my-secondary-color) font-semibold px-6 py-3 rounded-full transition flex flex-row items-center gap-2"
            >
               Xem toàn bộ sách
               <i class="pi pi-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </button>
         </div>

         <!-- Stats -->
         <div
            class="m-auto flex flex-row w-max justify-center gap-10 items-center p-6 rounded-xl shadow-2xl bg-white/80 backdrop-blur-2xl"
         >
            <div class="flex flex-col items-center min-w-32">
               <span class="text-3xl font-bold text-(--my-secondary-color)">10,000+</span>
               <span class="text-sm text-(--my-secondary-color)">Sách</span>
            </div>
            <div class="flex flex-col items-center min-w-32">
               <span class="text-3xl font-bold text-(--my-secondary-color)">1,000+</span>
               <span class="text-sm text-(--my-secondary-color)">Tác giả</span>
            </div>
            <div class="flex flex-col items-center min-w-32">
               <span class="text-3xl font-bold text-(--my-secondary-color)">100+</span>
               <span class="text-sm text-(--my-secondary-color)">Thể loại</span>
            </div>
         </div>
      </div>

      <img
         src="/images/hero-bg.jpg"
         alt="hero bg"
         class="absolute inset-0 z-10 object-cover w-full h-full"
      />
      <!-- </div> -->
   </div>
</template>
