<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useChatbotStore } from '@/stores/chatbot'

import Drawer from 'primevue/drawer'

const chatbot = useChatbotStore()
const { isOpen, openChatbot, closeChatbot } = toRefs(chatbot)
const inputValue = ref('')

const handleSubmit = () => {
  if (inputValue.value.trim()) {
    chatbot.sendMessage(inputValue.value)
    inputValue.value = ''
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Drawer v-model:visible="isOpen" header="Drawer" position="right">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </Drawer>
    <Button icon="pi pi-arrow-right" @click="openChatbot" />
  </div>
</template>

<style scoped>
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
