<template>
  <ul>
    <li v-for="character in characters" :key="character.id">
      <CharacterDetails :character="character" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { type Character } from '@/models'
import CharacterDetails from './CharacterDetails/CharacterDetails.vue'

defineProps<{
  characters: Character[]
}>()
</script>
