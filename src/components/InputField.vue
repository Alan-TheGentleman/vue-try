<template>
  <div class="input-field">
    <input :type="type" :placeholder="placeholder" v-model="computedValue" :required />
  </div>
  <p v-if="error" class="error-message">{{ error }}</p>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

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

const computedValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})
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
