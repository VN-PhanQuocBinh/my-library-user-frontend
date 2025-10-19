<script setup lang="ts">
import { Button } from 'primevue'
import '@/assets/css/home-page.css'

import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import StepItem from 'primevue/stepitem'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import AnimatedSection from '@/components/common/animated-section.vue'
</script>
<style scoped src="@/assets/css/home-page.css"></style>

<template>
   <section class="py-16 px-4 text-center">
      <div>
         <AnimatedSection :delay="0.05">
            <h2 class="text-3xl md:text-4xl font-bold mb-4 text-(--my-secondary-color)">
               Mượn sách dễ dàng
               <span class="text-yellow-400">Chỉ 3 bước đơn giản!</span>
            </h2>
         </AnimatedSection>
         <AnimatedSection :delay="0.1">
            <p class="text-gray-600 mt-4">
               Nhận sách bạn cần một cách nhanh chóng. Đây là cách bắt đầu hành trình mượn sách của
               bạn hôm nay.
            </p>
         </AnimatedSection>
      </div>
      <div class="mt-12">
         <AnimatedSection :delay="0.15">
            <div class="card flex justify-center">
               <Stepper value="1" class="basis-[50rem]">
                  <StepList>
                     <Step value="1">Tìm kiếm tiêu đề của bạn</Step>
                     <Step value="2">Chờ nhân viên</Step>
                     <Step value="3">Nhận sách của bạn</Step>
                  </StepList>
                  <StepPanels>
                     <StepPanel v-slot="{ activateCallback }" value="1">
                        <div class="flex flex-col h-48">
                           <div
                              class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
                           >
                              Step 1 Content
                           </div>
                        </div>
                        <div class="flex pt-6 justify-end">
                           <Button
                              label="Next"
                              icon="pi pi-arrow-right"
                              iconPos="right"
                              @click="activateCallback('2')"
                           />
                        </div>
                     </StepPanel>
                     <StepPanel v-slot="{ activateCallback }" value="2">
                        <div class="flex flex-col h-48">
                           <div
                              class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
                           >
                              Step 2 Content
                           </div>
                        </div>
                        <div class="flex pt-6 justify-between">
                           <Button
                              label="Back"
                              severity="secondary"
                              icon="pi pi-arrow-left"
                              @click="activateCallback('1')"
                           />
                           <Button
                              label="Next"
                              icon="pi pi-arrow-right"
                              iconPos="right"
                              @click="activateCallback('3')"
                           />
                        </div>
                     </StepPanel>
                     <StepPanel v-slot="{ activateCallback }" value="3">
                        <div class="flex flex-col h-48">
                           <div
                              class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
                           >
                              Step 3 Content
                           </div>
                        </div>
                        <div class="pt-6">
                           <Button
                              label="Back"
                              severity="secondary"
                              icon="pi pi-arrow-left"
                              @click="activateCallback('2')"
                           />
                        </div>
                     </StepPanel>
                  </StepPanels>
               </Stepper>
            </div>
         </AnimatedSection>
      </div>
   </section>
</template>

<style scoped>
:deep(.p-button) {
   display: none !important;
   @apply bg-(--my-primary-color) text-(--my-secondary-color) hover:bg-(--my-secondary-color)! hover:text-(--my-primary-color)! border-none!;
}
</style>
