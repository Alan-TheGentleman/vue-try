<template>
  <form @submit.prevent="handleSubmit" class="character-form">
    <InputField
      v-model="formData.name.value"
      type="text"
      placeholder="Name"
      :error="formData.name.error"
      required
    />
    <InputField
      v-model="formData.status.value"
      type="text"
      placeholder="Status"
      :error="formData.status.error"
      required
    />
    <InputField
      v-model="formData.species.value"
      type="text"
      placeholder="Species"
      :error="formData.species.error"
      required
    />
    <InputField
      v-model="formData.type.value"
      type="text"
      placeholder="Type"
      :error="formData.type.error"
    />
    <InputField
      v-model="formData.gender.value"
      type="text"
      placeholder="Gender"
      :error="formData.gender.error"
      required
    />
    <InputField
      v-model="formData.origin.value"
      type="text"
      placeholder="Origin"
      :error="formData.origin.error"
      required
    />
    <InputField
      v-model="formData.location.value"
      type="text"
      placeholder="Location"
      :error="formData.location.error"
      required
    />
    <InputField
      v-model="formData.image.value"
      type="url"
      placeholder="Image URL"
      :error="formData.image.error"
      required
    />
    <button type="submit">Save Character</button>
  </form>
</template>

<script lang="ts" setup>
import InputField from '@/components/InputField.vue'
import apiClient from '@/interceptors/axios'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { z } from 'zod'
import { useCharacterStore } from '@/stores/useCharactersStore'
import { EmptyCharacter } from '@/models'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)
const characterStore = useCharacterStore()

const characterSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  status: z.string().min(1, { message: 'Status is required' }),
  species: z.string().min(1, { message: 'Species is required' }),
  type: z.string().optional(),
  gender: z.string().min(1, { message: 'Gender is required' }),
  origin: z.string().min(1, { message: 'Origin is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  image: z.string().url({ message: 'Image URL is required' }),
})

const formData = ref({
  name: { value: '', error: '' },
  status: { value: '', error: '' },
  species: { value: '', error: '' },
  type: { value: '', error: '' },
  gender: { value: '', error: '' },
  origin: { value: '', error: '' },
  location: { value: '', error: '' },
  image: { value: '', error: '' },
})

if (isEdit.value) {
  const id = Number(route.params.id)
  const character = characterStore.getCharacterById(id) || EmptyCharacter
  formData.value = {
    name: { value: character.name, error: '' },
    status: { value: character.status, error: '' },
    species: { value: character.species, error: '' },
    type: { value: character.type, error: '' },
    gender: { value: character.gender, error: '' },
    origin: { value: character.origin.name, error: '' },
    location: { value: character.location.name, error: '' },
    image: { value: character.image, error: '' },
  }
}

const handleSubmit = async () => {
  try {
    Object.keys(formData.value).forEach((key) => {
      formData.value[key as keyof typeof formData.value].error = ''
    })

    const result = characterSchema.safeParse({
      name: formData.value.name.value,
      status: formData.value.status.value,
      species: formData.value.species.value,
      type: formData.value.type.value,
      gender: formData.value.gender.value,
      origin: formData.value.origin.value,
      location: formData.value.location.value,
      image: formData.value.image.value,
    })

    if (!result.success) {
      result.error.errors.forEach((e) => {
        const field = e.path[0] as keyof typeof formData.value
        if (formData.value[field]) {
          formData.value[field].error = e.message
        }
      })
      return
    }

    const formDataPayload = Object.fromEntries(
      Object.entries(formData.value).map(([key, { value }]) => [key, value]),
    )

    if (isEdit.value) {
      await apiClient.put(`/characters/${route.params.id}`, formDataPayload)
    } else {
      await apiClient.post('/characters', formDataPayload)
    }

    router.push('/characters')
  } catch (err: unknown) {
    console.error('Error al guardar personaje', err)
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
