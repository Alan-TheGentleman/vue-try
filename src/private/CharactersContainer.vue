<template>
  <div>
    <h1>Personajes de Rick And Morty</h1>
    <CharacterList :characters="characters" />
  </div>
</template>

<script lang="ts" setup>
import { useCharacterStore } from '@/stores/useCharactersStore'
import { computed } from 'vue'
import CharacterList from './CharactersList/CharactersList.vue'

const charactersStore = useCharacterStore()

const characters = computed(() => charactersStore.formattedCharacters)
</script>

<style module lang="scss"></style>
