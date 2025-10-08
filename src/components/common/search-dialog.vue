<script setup lang="ts">
import { ref, watch } from 'vue'
import { InputText } from 'primevue'
import { useDebounce } from '@/utils/use-debounce'
import Dialog from 'primevue/dialog'

defineProps({ open: Boolean })
const emit = defineEmits(['update:open', 'update:close'])

const searchValue = ref<string>('')
const [debouncedSearchValue, setDebouncedSearchValue] = useDebounce(searchValue.value, 300)

watch(searchValue, (newValue) => {
   setDebouncedSearchValue(newValue)
})

watch(debouncedSearchValue, (newValue) => {
   console.log('Debounced Search Value:', newValue)
})
</script>

<template>
   <Dialog
      :visible="open"
      header="Search"
      :modal="true"
      :closable="true"
      :style="{ width: '50vw' }"
      @update:visible="emit('update:open', $event)"
   >
      <div
         class="px-4 rounded-full bg-gray-100 border focus-within:border-(--my-primary-color) transition"
      >
         <i class="pi pi-search text-gray-400" :style="{ fontSize: '1rem' }" />
         <InputText
            v-model="searchValue"
            placeholder="Search"
            unstyled
            class="outline-none text-gray-800 px-3 py-2"
         />
      </div>
   </Dialog>
</template>
