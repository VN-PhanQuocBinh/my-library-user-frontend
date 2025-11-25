<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useChatbotStore } from '@/stores/chatbot'

import Button from 'primevue/button'
import Drawer from 'primevue/drawer'

const chatbot = useChatbotStore()
const { isOpen, openChatbot, closeChatbot } = toRefs(chatbot)
const inputValue = ref('')
const isSemanticSearch = ref(false)

const handleSubmit = () => {
  if (inputValue.value.trim()) {
    chatbot.sendMessage(inputValue.value)
    inputValue.value = ''
  }
}
</script>

<template>
  <div class="card flex justify-center max-h-screen">
    <Drawer
      v-model:visible="isOpen"
      header="Chatbot"
      position="right"
      :show-close-icon="false"
      class="w-[500px]!"
    >
      <template #header>
        <div class="w-full flex flex-row justify-between align-items-center">
          <h2 class="flex items-center text-2xl font-semibold">Chatbot</h2>

          <button
            class="hover:bg-gray-100 text-gray-700 p-2 size-9 rounded-full"
            @click="closeChatbot"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>
      </template>
      <div class="w-full h-full flex flex-col justify-end">
        <div class="flex flex-row items-end gap-3">
          <Button
            :class="[
              'shrink-0 size-12! rounded-md transition-colors duration-300',
              { 'bg-(--my-secondary-color)/20!': isSemanticSearch },
              { 'border border-gray-200': !isSemanticSearch },
            ]"
            icon="pi pi-lightbulb"
            severity="secondary"
            :variant="isSemanticSearch ? 'filled' : 'outlined'"
            @click="isSemanticSearch = !isSemanticSearch"
            v-tooltip.top="'Toggle Semantic Search'"
            unstyled
          />

          <div
            contenteditable
            class="flex-1 border border-gray-400 p-3 rounded-lg text-base word-wrap-div outline-(--my-secondary-color) focus:outline-1"
          ></div>

          <Button
            class="shrink-0 size-12! bg-(--my-primary-color)! border-none!"
            icon="pi pi-send"
            severity="primary"
            v-tooltip.top="'Send Message'"
            @click="handleSubmit"
          />
        </div>
      </div>
    </Drawer>
  </div>
</template>

<style scoped>
.word-wrap-div {
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  max-width: 100%;
  min-height: 48px;
  max-height: 120px;
  overflow-y: auto;
}

.chatbot-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.chatbot-drawer {
  width: 350px;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
}

.chatbot-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.chatbot-messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.message {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  max-width: 80%;
}

.message.user {
  background: #007bff;
  color: white;
  margin-left: auto;
}

.message.bot {
  background: #f1f1f1;
  color: #333;
}

.typing {
  font-style: italic;
  opacity: 0.7;
}

.chatbot-input {
  padding: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  gap: 0.5rem;
}

.chatbot-input input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.chatbot-input button {
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
