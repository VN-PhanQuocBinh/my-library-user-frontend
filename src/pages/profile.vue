<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'primevue'
import { Form } from '@primevue/forms'
import { InputText, DatePicker, Select, Toast, Message, Button } from 'primevue'

import { EditProfileSchema } from '@/types/auth-schema'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { updateProfile } from '@/services/auth.service'
import type { UpdateProfileType } from '@/types/auth-schema'
import { formatCurrency } from '@/utils/format-currency'

const authStore = useAuthStore()
const { user, getProfile } = toRefs(authStore)
const toast = useToast()

const formattedTotalDebt = computed(() => {
   if (!user.value?.totalDebt) return '0 đ'

   return formatCurrency(user.value.totalDebt)
})

const resolver = zodResolver(EditProfileSchema)
const initialValues = computed<UpdateProfileType>(() => ({
   firstname: user.value?.firstname || '',
   lastname: user.value?.lastname || '',
   phoneNumber: user.value?.phoneNumber || '',
   address: user.value?.address || '',
   dateOfBirth: user.value?.dateOfBirth ? new Date(user.value.dateOfBirth) : new Date(),
   gender: user.value?.gender || 'other',
}))

const isSubmitting = ref(false)
const currentFormValues = ref<UpdateProfileType>({ ...initialValues.value })
const isFormDirty = computed(() => {
   for (const key in initialValues.value) {
      const initial = initialValues.value[key as keyof UpdateProfileType]
      const current = currentFormValues.value[key as keyof UpdateProfileType]

      if (key === 'dateOfBirth' && initial instanceof Date && current instanceof Date) {
         if (initial.getTime() !== current.getTime()) return true
      } else {
         if (initial !== current) return true
      }
   }
   return false
})

const updateCurrentFormValue = (field: keyof UpdateProfileType, value: any) => {
   if (typeof value === 'string' && value.trim() === currentFormValues.value[field]) return
   currentFormValues.value[field] = value
}

const onSubmit = async (event: any) => {
   try {
      if (!user.value?._id) return

      if (!event.valid) {
         toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: 'Vui lòng kiểm tra lại thông tin nhập vào.',
            life: 3000,
         })
         return
      }

      isSubmitting.value = true
      const response = await updateProfile(user.value._id, event.values as UpdateProfileType)

      await getProfile.value()
      toast.add({
         severity: 'success',
         summary: 'Thành công',
         detail: 'Cập nhật thông tin thành công',
         life: 3000,
      })
   } catch (error) {
      console.error('Error updating profile:', error)
      toast.add({
         severity: 'error',
         summary: 'Lỗi',
         detail: 'Cập nhật thông tin thất bại',
         life: 3000,
      })
   } finally {
      isSubmitting.value = false
   }
}

const handleCancel = () => {
   // Reset current form values to initial values
   currentFormValues.value = { ...initialValues.value }
}
</script>

<template>
   <Toast position="bottom-right" />

   <div class="mt-6 m-auto max-w-5xl p-6 min-h-96 bg-white rounded-lg shadow flex flex-row gap-8">
      <!-- Profile Picture Section -->
      <div class="flex-2 flex flex-col items-center gap-1">
         <div
            class="font-semibold text-4xl text-gray-800 size-24 bg-(--my-primary-color) rounded-full grid place-items-center"
         >
            {{ currentFormValues?.firstname.charAt(0) }}
         </div>
         <div class="text-gray-800 font-semibold text-xl">
            {{ currentFormValues?.lastname + ' ' + currentFormValues?.firstname }}
         </div>
         <div class="text-gray-600">{{ user?.email }}</div>

         <div class="flex-1 flex flex-col justify-end items-center gap-1">
            <label class="text-gray-500 font-medium">Tổng nợ</label>
            <div class="text-gray-800 text-2xl font-semibold">
               {{ formattedTotalDebt }}
            </div>
         </div>
      </div>

      <div class="flex-5">
         <!-- User Information Section -->
         <Form
            v-slot="$form"
            :initial-values="initialValues"
            @submit="onSubmit"
            :resolver="resolver"
         >
            <h2 class="text-2xl font-semibold text-gray-700 mb-4">Thông tin cá nhân</h2>
            <div class="space-y-4 text-gray-700 grid grid-cols-2 gap-4">
               <div class="flex flex-col items-start">
                  <label for="firstname" class="">Tên </label>
                  <InputText
                     @value-change="updateCurrentFormValue('firstname', $event)"
                     size="small"
                     name="firstname"
                     placeholder="Tên"
                     class="w-full mt-1"
                  />
                  <Message
                     v-if="$form.firstname?.invalid"
                     severity="error"
                     size="small"
                     variant="simple"
                  >
                     {{ $form.firstname.error?.message }}
                  </Message>
               </div>
               <div class="flex flex-col items-start">
                  <label for="lastname" class="">Họ </label>
                  <InputText
                     @value-change="updateCurrentFormValue('lastname', $event)"
                     size="small"
                     name="lastname"
                     placeholder="Họ"
                     class="w-full mt-1"
                  />
                  <Message
                     v-if="$form.lastname?.invalid"
                     severity="error"
                     size="small"
                     variant="simple"
                  >
                     {{ $form.lastname.error?.message }}
                  </Message>
               </div>
               <div class="flex flex-col items-start">
                  <label for="gender" class="">Giới tính </label>
                  <Select
                     @value-change="updateCurrentFormValue('gender', $event)"
                     size="small"
                     name="gender"
                     :options="[
                        { label: 'Nam', value: 'male' },
                        { label: 'Nữ', value: 'female' },
                        { label: 'Khác', value: 'other' },
                     ]"
                     placeholder="Giới tính"
                     option-value="value"
                     option-label="label"
                     class="w-full mt-1"
                  />
                  <Message
                     v-if="$form.gender?.invalid"
                     severity="error"
                     size="small"
                     variant="simple"
                  >
                     {{ $form.gender.error?.message }}
                  </Message>
               </div>
               <div class="flex flex-col items-start">
                  <label for="phoneNumber" class="">Số điện thoại </label>
                  <InputText
                     @value-change="updateCurrentFormValue('phoneNumber', $event)"
                     size="small"
                     name="phoneNumber"
                     placeholder="Số điện thoại"
                     class="w-full mt-1"
                  />
                  <Message
                     v-if="$form.phoneNumber?.invalid"
                     severity="error"
                     size="small"
                     variant="simple"
                  >
                     {{ $form.phoneNumber.error?.message }}
                  </Message>
               </div>
               <div class="flex flex-col items-start">
                  <label for="address" class="">Địa chỉ </label>
                  <InputText
                     @value-change="updateCurrentFormValue('address', $event)"
                     size="small"
                     name="address"
                     placeholder="Địa chỉ"
                     class="w-full mt-1"
                  />
                  <Message
                     v-if="$form.address?.invalid"
                     severity="error"
                     size="small"
                     variant="simple"
                  >
                     {{ $form.address.error?.message }}
                  </Message>
               </div>
               <div class="flex flex-col items-start">
                  <label for="dateOfBirth" class="">Ngày sinh </label>
                  <DatePicker
                     @value-change="updateCurrentFormValue('dateOfBirth', $event)"
                     :show-icon="true"
                     size="small"
                     name="dateOfBirth"
                     placeholder="Ngày sinh"
                     class="w-full mt-1"
                  />
                  <Message
                     v-if="$form.dateOfBirth?.invalid"
                     severity="error"
                     size="small"
                     variant="simple"
                  >
                     {{ $form.dateOfBirth.error?.message }}
                  </Message>
               </div>
            </div>

            <div class="col-span-2 flex justify-end">
               <button
                  @click="
                     () => {
                        $form.reset()
                        handleCancel()
                     }
                  "
                  :disabled="!isFormDirty"
                  type="button"
                  class="mt-6 bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed! enabled:hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-md transition mr-3"
               >
                  Hủy
               </button>

               <button
                  :disabled="!$form.valid || !isFormDirty || isSubmitting"
                  type="submit"
                  class="min-w-[190px] flex items-center justify-center mt-6 bg-(--my-primary-color) disabled:opacity-70 disabled:cursor-not-allowed! enabled:hover:bg-amber-400 text-gray-800 font-semibold py-2 px-6 rounded-md transition"
               >
                  <i v-if="isSubmitting" class="pi pi-spinner animate-spin"></i>
                  <span v-else>Cập nhật thông tin</span>
               </button>
            </div>
         </Form>
      </div>
   </div>
</template>
