<script setup lang="ts">
import { computed, ref, toRef, toRefs, watch, nextTick, type VNodeRef } from 'vue'
import { useChatbotStore } from '@/stores/chatbot'
import Popover from 'primevue/popover'
import { useToast } from 'primevue'
import Toast from 'primevue/toast'
import InputText from 'primevue/inputtext'

import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import MessageArea from './message-area.vue'

const chatbot = useChatbotStore()
const {
  isOpen,
  isSendingMessage,
  closeChatbot,
  currentConversation,
  sendMessage,
  conversationHistory,
  getConversationMessages,
  createNewConversation,
  renameConversation,
} = toRefs(chatbot)
const toast = useToast()
const messages = computed(() => currentConversation.value?.messages ?? [])
const inputRef = ref<VNodeRef | null>(null)
const isSemanticSearch = ref(false)
const historyMenuRef = ref<InstanceType<typeof Popover> | null>(null)
const currentTitle = ref(currentConversation.value?.title)
const openEditTitle = ref(false)

watch(
  () => currentConversation.value?.title,
  (newTitle) => {
    currentTitle.value = newTitle || 'Cuộc trò chuyện mới'
  },
  { immediate: true },
)

const handleSubmit = async () => {
  try {
    if (!inputRef.value) {
      return
    }

    const text = (inputRef.value as HTMLElement).innerText.trim()
    if (text === '') {
      toast.add({
        severity: 'warn',
        summary: 'Cảnh báo',
        detail: 'Vui lòng nhập tin nhắn trước khi gửi.',
        life: 3000,
      })
      return
    }

    await sendMessage.value({
      content: text,
      type: isSemanticSearch.value ? 'BOOK_RECOMMENDATION' : 'SYSTEM_INFO',
    })

    inputRef.value.innerText = ''
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Gửi tin nhắn thất bại. Vui lòng thử lại.',
      life: 3000,
    })
  }
}

const toggleHistoryMenu = (event: MouseEvent) => {
  if (historyMenuRef.value) {
    historyMenuRef.value.toggle(event)
  }
}

const handleSwitchConversation = async (conversationId: string) => {
  if (conversationId === currentConversation.value?.conversationId) {
    return
  }

  historyMenuRef.value?.hide()
  await getConversationMessages.value(conversationId)
}

const handleCrateNewConversation = async () => {
  await createNewConversation.value()
}

const handleEditTitle = () => {
  openEditTitle.value = true
  nextTick(() => {
    const input = document.getElementById('title-edit-input')
    if (input) {
      input.focus()
    }
  })
}

const handleRename = async (e: Event) => {
  openEditTitle.value = false
  const newTitle = currentTitle.value

  if (newTitle?.trim() === '') {
    toast.add({
      severity: 'warn',
      summary: 'Cảnh báo',
      detail: 'Tiêu đề không được để trống.',
      life: 3000,
    })

    currentTitle.value = currentConversation.value?.title || 'Cuộc trò chuyện mới'
    return
  }

  if (newTitle && newTitle !== currentConversation.value?.title) {
    await renameConversation.value(newTitle)
  }
}
</script>

<template>
  <div class="card flex justify-center max-h-screen">
    <Toast v-if="isOpen" position="bottom-left" />

    <Drawer
      v-model:visible="isOpen"
      header="Chatbot"
      position="right"
      :show-close-icon="false"
      class="w-[500px]!"
    >
      <template #header>
        <div
          class="w-full flex flex-row justify-between align-items-center border-b border-gray-200 pb-3"
        >
          <div>
            <button
              class="hover:bg-gray-100 text-gray-700 p-2 size-9 rounded-full"
              @click="toggleHistoryMenu"
              v-tooltip.bottom="'Lịch sử cuộc trò chuyện'"
            >
              <i class="pi pi-history"></i>
            </button>

            <button
              class="hover:bg-gray-100 text-gray-700 p-2 size-9 rounded-full"
              @click="handleCrateNewConversation"
              v-tooltip.bottom="'Cuộc trò chuyện mới'"
            >
              <i class="pi pi-plus"></i>
            </button>
          </div>

          <Popover ref="historyMenuRef">
            <div>
              <h3 class="text-base font-semibold mb-2!">Lịch sử cuộc trò chuyện</h3>
              <div class="flex flex-col">
                <div
                  v-for="(conversation, index) in conversationHistory"
                  :key="index"
                  :class="[
                    'py-2 px-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer',
                    {
                      'bg-(--my-primary-color)! font-semibold rounded-sm':
                        conversation._id === currentConversation?.conversationId,
                    },
                  ]"
                  @click="handleSwitchConversation(conversation._id)"
                >
                  <span class="text-sm text-gray-700 line-clamp-1">{{ conversation.title }}</span>
                </div>
              </div>
            </div>
          </Popover>

          <div class="flex items-center">
            <InputText
              id="title-edit-input"
              v-show="openEditTitle"
              v-model="currentTitle"
              @blur="handleRename"
              @keyup.enter="handleRename"
            />
            <span
              v-show="!openEditTitle"
              class="text-2xl font-semibold"
              @dblclick="handleEditTitle"
              >{{ currentConversation?.title }}</span
            >
          </div>

          <button
            class="hover:bg-gray-100 text-gray-700 p-2 size-9 rounded-full"
            @click="closeChatbot"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>
      </template>
      <div class="w-full h-full flex flex-col">
        <MessageArea :messages="messages" class="flex-1" />

        <div class="flex flex-row items-end gap-3 pt-3 border-t border-gray-200">
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
            v-tooltip.top="'Tìm kiếm ngữ cảnh'"
            unstyled
          />

          <div
            class="relative flex-1 flex flex-row items-end border border-gray-300 px-3 pr-1 py-1 min-h-12 rounded-lg text-base"
          >
            <div
              contenteditable
              class="self-center flex-1 word-wrap-div outline-none focus:outline-1"
              ref="inputRef"
            ></div>
            <Button
              class="shrink-0 size-10! bg-(--my-primary-color)! hover:bg-(--my-primary-color)/80! text-(--my-secondary-color)! border-none!"
              :icon="isSendingMessage ? 'pi pi-stop-circle' : 'pi pi-send'"
              severity="primary"
              v-tooltip.top="{ value: 'Gửi tin nhắn', showDelay: 1000 }"
              @click="handleSubmit"
            />
          </div>
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
  /* min-height: 48px; */
  max-height: 120px;
  overflow-y: auto;
  box-sizing: border-box;
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
