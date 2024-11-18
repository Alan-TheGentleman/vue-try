import apiClient from '@/interceptors/axios'
import { EmptyCharacter, type Character } from '@/models'
import { defineStore } from 'pinia'

export const useCharacterStore = defineStore('character', {
  state: () => ({
    characters: new Map<number, Character>(),
  }),
  getters: {
    formattedCharacters(state): Character[] {
      return Array.from(state.characters.values())
    },
  },

  actions: {
    getCharacterById(id: number) {
      return this.characters.get(id)
    },
    async fetchCharacters() {
      try {
        const response = await apiClient.get<{ results: Character[] }>('/character')
        const result = response.data.results

        const newMap = new Map<number, Character>()
        result.forEach((character) => {
          newMap.set(character.id, character)
        })

        this.characters = newMap
      } catch (error) {
        console.error('Error fetching characters: ', error)

        const defaultCharacter: Character = EmptyCharacter

        this.characters = new Map<number, Character>([[defaultCharacter.id, defaultCharacter]])
      }
    },

    async addCharacter(character: Character) {
      try {
        const response = await apiClient.post<Character>('/character', character)
        const newCharacter = response.data

        this.characters.set(newCharacter.id, newCharacter)
      } catch (error) {
        console.error('Error adding character: ', error)
      }
    },

    async editCharacter(character: Character) {
      try {
        const response = await apiClient.put<Character>(`/character/${character.id}`, character)
        const updatedCharacter = response.data

        this.characters.set(updatedCharacter.id, updatedCharacter)
      } catch (error) {
        console.error('Error editing character: ', error)
      }
    },

    async deleteCharacter(id: number) {
      try {
        await apiClient.delete(`/character/${id}`)

        this.characters.delete(id)
      } catch (error) {
        console.error('error deleting character: ', error)
      }
    },
  },
})
