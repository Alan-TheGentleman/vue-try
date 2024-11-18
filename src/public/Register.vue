<template>
  <form @submit.prevent="handleRegister">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required />
    <button type="submit">Register</button>
    <div v-if="error" class="error-message">{{ error }}</div>
  </form>
</template>

<script lang="ts" setup>
import apiClient from '@/interceptors/axios'
import { useAuthStore } from '@/stores'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleRegister = async () => {
  try {
    error.value = ''
    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match'
      throw new Error('Passwords do not match')
    }

    const response = await apiClient.post('/register', {
      email: email.value,
      password: password.value,
    })

    authStore.setToken(response.data.token)

    router.push('/characters')
  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || 'Error during registration'
    console.error('Error during registration', err)
  }
}
</script>

<style module lang="scss">
.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
