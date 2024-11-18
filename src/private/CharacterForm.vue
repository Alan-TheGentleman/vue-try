<template>
  <template>
    <form @submit.prevent="handleSubmit" class="character-form">
      <input v-model="character.name" type="text" placeholder="Name" required />
      <input v-model="character.status" type="text" placeholder="Status" required />
      <input v-model="character.species" type="text" placeholder="Species" required />
      <input v-model="character.type" type="text" placeholder="Type" />
      <input v-model="character.gender" type="text" placeholder="Gender" required />
      <input v-model="character.origin.name" type="text" placeholder="Origin" required />
      <input v-model="character.location.name" type="text" placeholder="Location" required />
      <input v-model="character.image" type="url" placeholder="Image URL" required />
      <button type="submit">Save Character</button>
    </form>
  </template>
</template>

<script lang="ts" setup>
import { type Character, EmptyCharacter } from '@/models'
import { useCharacterStore } from '@/stores/useCharactersStore'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isEdit = ref(!!route.params.id)
const character = ref<Character>(EmptyCharacter)
const characterStore = useCharacterStore()

if (isEdit.value) {
  const id = Number(route.params.id)
  character.value = characterStore.getCharacterById(id) || EmptyCharacter
}

const handleSubmit = async () => {
  try {
    if (isEdit.value) {
      await characterStore.editCharacter(character.value)
    } else {
      await characterStore.addCharacter(character.value)
    }
    router.push('/characters')
  } catch (error) {
    console.error('Error al guardar personaje: ', error)
  }
}
</script>

<style lang="scss"></style>
