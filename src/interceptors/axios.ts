import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { type Character } from '@/models'
import { mockCharacters } from './mocks/charactersMock'
import { useAuthStore } from '@/stores'

const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const mock = new MockAdapter(apiClient)

// Simular el endpoint de registro
mock.onPost('/register').reply((config) => {
  const { email, password } = JSON.parse(config.data)
  const authStore = useAuthStore()

  if (email && password) {
    const token = 'mocked_token'
    authStore.setToken(token)
    return [200, { token }]
  } else {
    return [400, { message: 'Invalid email or password' }]
  }
})

// Simular el endpoint de login
mock.onPost('/login').reply((config) => {
  const { email, password } = JSON.parse(config.data)
  const authStore = useAuthStore()

  if (email === 'test@example.com' && password === 'password') {
    const token = 'mocked_token'
    authStore.setToken(token)
    return [200, { token }]
  } else {
    return [401, { message: 'Invalid email or password' }]
  }
})

// Simular obtener personajes
mock.onGet('/characters').reply(200, mockCharacters)

// Simular crear personaje
mock.onPost('/characters').reply((config) => {
  const characterData: Character = JSON.parse(config.data)

  mockCharacters.push(characterData)
  return [200, characterData]
})

// Simular actualizar personaje
mock.onPut(/\/characters\/\d+/).reply((config) => {
  const id = parseInt(config.url!.split('/').pop()!)
  const characterData: Character = JSON.parse(config.data)
  const index = mockCharacters.findIndex((character) => character.id === id)

  if (index !== -1) {
    mockCharacters[index] = characterData
    return [200, characterData]
  } else {
    return [404, { message: 'Character not found' }]
  }
})

// Simular eliminar personaje
mock.onDelete(/\/characters\/\d+/).reply((config) => {
  const id = parseInt(config.url!.split('/').pop()!)
  const index = mockCharacters.findIndex((character) => character.id === id)

  if (index !== -1) {
    mockCharacters.splice(index, 1)
    return [200, { data: id }]
  } else {
    return [404, { message: 'Character not found' }]
  }
})

export default apiClient
