<template>
  <div>
    <img :src="character.image" :alt="character.name" />
    <h2>{{ character.name }}</h2>
    <button @click="editCharacter(character)">Editar</button>
    <button @click="removeCharacter(character.id)">Remover</button>
  </div>
</template>

<script lang="ts" setup>
import { type Character } from '@/models'
import { useCharacterStore } from '@/stores/useCharactersStore'
import { useRouter } from 'vue-router'

defineProps<{
  character: Character
}>()

const charactersStore = useCharacterStore()
const router = useRouter()

const editCharacter = (character: Character) => {
  router.push({ name: 'EditCharacter', params: { id: character.id } })
}

const removeCharacter = async (id: number) => {
  await charactersStore.deleteCharacter(id)
}
</script>
