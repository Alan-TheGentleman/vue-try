<template>
  <form @submit.prevent="handleRegister">
    <InputField
      v-model="formData.username.value"
      type="text"
      placeholder="Username"
      :error="formData.username.error"
      required
    />
    <InputField
      v-model="formData.password.value"
      type="password"
      placeholder="Password"
      :error="formData.password.error"
      required
    />
    <InputField
      v-model="formData.confirmPassword.value"
      type="password"
      placeholder="Confirm Password"
      :error="formData.confirmPassword.error"
      required
    />
    <button type="submit">Register</button>
  </form>
</template>

<script lang="ts" setup>
import InputField from '@/components/InputField.vue'
import apiClient from '@/interceptors/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const registerSchema = z
  .object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm Password must be at least 6 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

const formData = ref({
  username: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: '',
  },
  confirmPassword: {
    value: '',
    error: '',
  },
})

const router = useRouter()

const handleRegister = async () => {
  try {
    Object.keys(formData.value).forEach((key) => {
      formData.value[key as keyof typeof formData.value].error = ''
    })

    const result = registerSchema.safeParse({
      username: formData.value.username.value,
      password: formData.value.password.value,
      confirmPassword: formData.value.confirmPassword.value,
    })

    if (!result.success) {
      result.error.errors.forEach((e) => {
        const field = e.path[0] as keyof typeof formData.value
        if (formData.value[field]) {
          formData.value[field].error = e.message
        }
      })
      return
    }

    await apiClient.post('/register', {
      username: formData.value.username.value,
      password: formData.value.password.value,
    })

    router.push('/characters')
  } catch (err: unknown) {
    console.error('Error al registrar', err)
  }
}
</script>

<style module lang="scss">
.error-message {
  color: red;
  margin-top: 8px;
  font-size: 14px;
}
</style>
