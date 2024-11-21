import CharacterForm from '@/private/CharacterForm.vue'
import CharactersContainer from '@/private/CharactersContainer.vue'
import Login from '@/public/Login.vue'
import Register from '@/public/Register.vue'
import { useAuthStore } from '@/stores'
import { useCharacterStore } from '@/stores/useCharactersStore'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: 'Login' } },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/characters', name: 'CharactersContainer', component: CharactersContainer },
    { path: '/characters/new', name: 'NewCharacter', component: CharacterForm },
    { path: '/characters/edit/:id', name: 'EditCharacter', component: CharacterForm },
  ],
})

router.beforeEach(async (to, _from, next) => {
  const publicPages = ['Login', 'Register']
  const authRequired = !publicPages.includes(to.name as string)

  const authStore = useAuthStore()
  const characterStore = useCharacterStore()
  const token = authStore?.token

  if (authRequired) {
    characterStore.init()
    if (!token) {
      return next({ name: 'Login' })
    }
  }

  next()
})

export default router
