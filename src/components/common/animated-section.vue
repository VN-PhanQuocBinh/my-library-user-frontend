<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { motion, useInView } from 'motion-v'

interface Props {
   delay?: number
   className?: string
}

const props = withDefaults(defineProps<Props>(), {
   delay: 0,
   className: '',
})

const domRef = ref<HTMLElement | null>(null)
const isInView = useInView(domRef, {
   once: true,
   // margin: '-10%',
})

const variants = {
   visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: props.delay },
   },
   hidden: {
      opacity: 0,
      y: 20,
   },
}

const animateState = computed(() => (isInView.value ? 'visible' : 'hidden'))
</script>

<template>
   <motion.div
      ref="domRef"
      :initial="'hidden'"
      :animate="animateState"
      :variants="variants"
      :class="className"
   >
      <slot />
   </motion.div>
</template>
