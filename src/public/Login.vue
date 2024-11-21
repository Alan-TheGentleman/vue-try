<template>
  <form @submit.prevent="handleLogin">
    <InputField
      v-model="formData.email.value"
      type="email"
      placeholder="Email"
      :error="formData.email.error"
      required
    />
    <InputField
      v-model="formData.password.value"
      type="password"
      placeholder="Password"
      :error="formData.password.error"
      required
    />
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts" setup>
import InputField from '@/components/InputField.vue'
import apiClient from '@/interceptors/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
})

const formData = ref({
  email: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: '',
  },
})

const router = useRouter()

const handleLogin = async () => {
  try {
    Object.keys(formData.value).forEach((key) => {
      formData.value[key as keyof typeof formData.value].error = ''
    })

    const result = loginSchema.safeParse({
      email: formData.value.email.value,
      password: formData.value.password.value,
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

    await apiClient.post('/login', {
      email: formData.value.email.value,
      password: formData.value.password.value,
    })

    router.push('/characters')
  } catch (err: unknown) {
    console.error('Error al iniciar sesión', err)
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
