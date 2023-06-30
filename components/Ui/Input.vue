<script setup lang="ts">
import { ZodObject } from 'zod';
const modelValue = defineModel<string | number>({ required: true });
export interface Props {
  id: string;
  label?: string;
  type?: 'text' | 'number' | 'email' | 'password';
  error?: string | string[];
  disabled?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: true
});
</script>

<template>
  <div>
    <label v-if="props.label" class="mb-1 block" :for="props.id">{{
      props.label
    }}</label>
    <input
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :class="{
        'disabled:opacity-8 disabled:cursor-not-allowed': props.disabled
      }"
      class="focus:shadow-outline h-10 w-full rounded-lg border px-3 text-base placeholder-gray-600"
      :type="type"
      :id="props.id"
      v-model="modelValue"
    />
  </div>
</template>

<style lang="scss" scoped></style>
