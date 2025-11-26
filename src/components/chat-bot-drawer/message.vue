<script setup lang="ts">
export interface MessageProps {
  role?: 'user' | 'bot'
  content: string
  data?: any
}

const { role, content, data } = defineProps<MessageProps>()
</script>

<template>
  <div
    :class="[
      'bg-gray-100 px-4 py-2 rounded-lg mb-2 max-w-[80%]',
      { 'bg-(--my-secondary-color)! text-white self-end': role === 'user' },
    ]"
  >
    <slot></slot>
  </div>
</template>
