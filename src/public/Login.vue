<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <p v-if="error" class="error-message">{{ error }}</p>
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts" setup>
import apiClient from '@/interceptors/axios'
import { useAuthStore } from '@/stores'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    error.value = ''
    const response = await apiClient.post('/login', {
      email: email.value,
      password: password.value,
    })

    authStore.setToken(response.data.token)

    router.push('/characters')
  } catch (err: unknown) {
    console.error('Error al iniciar sesión', err)
    error.value = 'Invalid email or password'
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
