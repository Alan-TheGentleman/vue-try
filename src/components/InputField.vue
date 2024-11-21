<template>
  <div class="input-field">
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="modelValue"
      @input="$emit('update:modelValue', modelValue)"
      :required
    />
  </div>
  <p v-if="error" class="error-message">{{ error }}</p>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    modelValue.value = newValue
  },
)
</script>

<style module lang="scss">
.input-field {
  margin-bottom: 16px;
}

.error-message {
  color: red;
  margin-top: 8px;
  font-size: 14px;
}
</style>
