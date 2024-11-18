import apiClient from '@/interceptors/axios'
import type { Character } from '@/models/character.model'

export const getCharacters = () => {
  return apiClient.get('/character')
}

export const createCharacter = (characterData: Character) => {
  return apiClient.post('/character', characterData)
}

export const updateCharacter = (id: number, characterData: Character) => {
  return apiClient.put(`/character/${id}`, characterData)
}

export const deleteCharacter = (id: number) => {
  return apiClient.delete(`/character/${id}`)
}
