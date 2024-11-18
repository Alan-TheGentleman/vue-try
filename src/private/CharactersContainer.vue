<template>
  <div>
    <h1>Personajes de Rick And Morty</h1>
    <CharacterList :characters="characters" />
  </div>
</template>

<script lang="ts" setup>
import { useCharacterStore } from '@/stores/useCharactersStore'
import { onMounted } from 'vue'
import CharacterList from './CharactersList/CharactersList.vue'

const charactersStore = useCharacterStore()
const { formattedCharacters: characters } = charactersStore

const fetchCharacters = async () => {
  await charactersStore.fetchCharacters()
}

onMounted(() => {
  fetchCharacters()
})
</script>

<style module lang="scss"></style>
