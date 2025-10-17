<script setup lang="ts">
// import '@/assets/css/auth-page.css'

import { reactive } from 'vue'
import { useToast } from 'primevue/usetoast'
import { Toast, Message, InputText, Button, Password } from 'primevue'
import { Form, FormField } from '@primevue/forms'

import { zodResolver } from '@primevue/forms/resolvers/zod'
import { LoginSchema, type LoginType } from '@/types/auth-schema'

import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

// login code
const { loginUser } = useAuthStore()
const toast = useToast()
const errorMessage = ref('')

const initialValues = reactive({
   email: '',
   password: '',
})

const resolver = zodResolver(LoginSchema)

const handleLogin = async (values: LoginType) => {
   try {
      await loginUser(values)
      toast.add({
         severity: 'success',
         summary: 'Login successful',
         life: 3000,
      })

      errorMessage.value = ''
   } catch (error: any) {
      errorMessage.value = error?.response?.data?.message || 'An error occurred during login.'
      toast.add({
         severity: 'error',
         summary: 'Login failed',
         detail: error?.response?.data?.message || 'An error occurred during login.',
         life: 3000,
      })
   }
}

const onFormSubmit = async (event: any) => {
   if (event.valid) {
      await handleLogin(event.values as LoginType)
   }
}

</script>

<template>
   <div class="w-full bg-slate-50 flex justify-center min-h-screen p-10">
      <div class="flex flex-col items-center gap-2 w-max h-max p-8 bg-white shadow-md rounded-xl">
         <Toast position="bottom-right" class="items-center!" />

         <div class="flex flex-col items-center gap-1">
            <h1 class="text-3xl font-bold text-(--my-secondary-color)">ĐĂNG NHẬP</h1>
            <p class="text-gray-500">Đăng nhập vào tài khoản của bạn</p>
         </div>

         <div
            v-show="errorMessage !== ''"
            class="text-red-500 text-base font-semibold w-full sm:w-80 px-3 py-1 rounded-sm bg-red-100"
         >
            <span>{{ errorMessage }}</span>
         </div>

         <Form
            v-slot="$form"
            :initialValues
            :resolver
            @submit="onFormSubmit"
            class="flex flex-col gap-4 w-full sm:w-80"
         >
            <!-- Email -->
            <FormField class="flex flex-col gap-1">
               <label for="email" class="text-gray-600">Email</label>
               <InputText name="email" type="text" placeholder="Email" fluid />
               <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.email.error?.message }}
               </Message>
            </FormField>

            <!-- Password -->
            <FormField class="flex flex-col gap-1">
               <label for="password" class="text-gray-600">Mật khẩu</label>
               <Password
                  name="password"
                  type="text"
                  placeholder="Mật khẩu"
                  :feedback="false"
                  toggleMask
                  fluid
               />
               <Message
                  v-if="$form.password?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
               >
                  {{ $form.password.error?.message }}
               </Message>
            </FormField>

            <router-link
               to="/forgot-password"
               class="self-end text-(--my-secondary-color)! underline text-sm"
               >Quên mật khẩu?</router-link
            >

            <Button type="submit" severity="success" label="Đăng nhập" />

            <p class="text-gray-600 text-center">
               Bạn chưa có tài khoản?
               <router-link to="/register" class="text-(--my-secondary-color)! underline!">Đăng ký</router-link>
            </p>
         </Form>
      </div>
   </div>
</template>

<style scoped>
.p-button {
   @apply bg-(--my-primary-color)! text-(--my-secondary-color)! border-none! hover:bg-(--my-primary-color)/80!;
}

</style>
