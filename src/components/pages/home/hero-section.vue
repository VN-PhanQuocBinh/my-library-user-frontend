<script setup lang="ts">
import { animate, motion, useMotionValue, RowValue } from 'motion-v'
import { Image } from 'primevue'

import { onMounted, onUnmounted } from 'vue'

const count = useMotionValue(9970)
let controls: ReturnType<typeof animate>

onMounted(() => {
   controls = animate(count, 10000, {
      duration: 2.5,
   })
})

onUnmounted(() => {
   controls.stop()
})
</script>

<template>
   <div class="h-[600px] relative overflow-hidden m-6 rounded-xl shadow-lg">
      <!-- <div class="relative h-full"> -->
      <div class="absolute inset-0 w-full h-full backdrop-blur-xs bg-black/20 z-20">
         <div class="h-max w-full flex flex-col justify-center items-center p-12 mb-12 gap-6">
            <motion.h1
               :initial="{ y: 30, opacity: 0 }"
               :animate="{ y: 0, opacity: 1 }"
               :transition="{ duration: 0.8, ease: 'easeOut' }"
               class="text-5xl font-bold text-white text-center leading-tight flex flex-col gap-2"
            >
               <!-- <h1
                  class="text-5xl font-bold text-white text-center leading-tight flex flex-col gap-2"
               > -->
               <span class="block">MỞ CÁNH CỬA</span>
               <span class="block">VÀO TƯƠNG LAI KIẾN THỨC</span>
               <!-- </h1> -->
            </motion.h1>
            <p class="text-lg text-gray-100 flex flex-col items-center text-center max-w-2xl">
               <motion.span
                  :initial="{ y: 20, opacity: 0 }"
                  :animate="{ y: 0, opacity: 1 }"
                  :transition="{ duration: 0.8, ease: 'easeOut', delay: 0.2 }"
                  >Khám phá hàng ngàn tựa sách từ mọi lĩnh vực:
               </motion.span>
               <motion.span
                  :initial="{ y: 20, opacity: 0 }"
                  :animate="{ y: 0, opacity: 1 }"
                  :transition="{ duration: 0.8, ease: 'easeOut', delay: 0.4 }"
                  >Sách mới, Sách bán chạy và Những tác phẩm kinh điển.</motion.span
               >
            </p>
            <routerLink to="/books">
               <motion.button
                  :initial="{ scale: 0.8, opacity: 0 }"
                  :animate="{ scale: 1, opacity: 1 }"
                  :transition="{ duration: 0.4, ease: 'easeInOut', delay: 0.5 }"
                  class="group border border-(--my-primary-color) text-white hover:bg-(--my-primary-color) hover:text-(--my-secondary-color) font-semibold px-6 py-3 rounded-full transition flex flex-row items-center gap-2"
               >
                  Xem toàn bộ sách
                  <i class="pi pi-arrow-right group-hover:translate-x-1 transition-transform"></i>
               </motion.button>
            </routerLink>
         </div>

         <!-- Stats -->
         <div
            class="m-auto flex flex-row w-max justify-center gap-10 items-center p-6 rounded-xl shadow-2xl bg-white/80 backdrop-blur-2xl"
         >
            <motion.div
               :initial="{ y: 10, opacity: 0 }"
               :animate="{ y: 0, opacity: 1 }"
               :transition="{ duration: 0.4, ease: 'easeInOut', delay: 0.6 }"
               class="flex flex-col items-center min-w-32"
            >
               <span class="text-3xl font-bold text-(--my-secondary-color)">10,000+</span>
               <span class="text-sm text-(--my-secondary-color)">Sách</span>
            </motion.div>
            <motion.div
               :initial="{ y: 15, opacity: 0 }"
               :animate="{ y: 0, opacity: 1 }"
               :transition="{ duration: 0.4, ease: 'easeInOut', delay: 0.65 }"
               class="flex flex-col items-center min-w-32"
            >
               <span class="text-3xl font-bold text-(--my-secondary-color)">1,000+</span>
               <span class="text-sm text-(--my-secondary-color)">Tác giả</span>
            </motion.div>
            <motion.div
               :initial="{ y: 20, opacity: 0 }"
               :animate="{ y: 0, opacity: 1 }"
               :transition="{ duration: 0.4, ease: 'easeInOut', delay: 0.7 }"
               class="flex flex-col items-center min-w-32"
            >
               <span class="text-3xl font-bold text-(--my-secondary-color)">100+</span>
               <span class="text-sm text-(--my-secondary-color)">Thể loại</span>
            </motion.div>
         </div>
      </div>

      <img
         src="/images/hero-bg.jpg"
         alt="hero bg"
         class="absolute inset-0 z-10 object-cover w-full h-full scale-110"
      />
      <!-- </div> -->
   </div>
</template>
