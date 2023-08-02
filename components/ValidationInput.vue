<script setup lang="ts">
const modelValue = defineModel<string | number | undefined>();
const props = defineProps(['label', 'name']);

const { errors } = useField(() => props.name, undefined, {
  syncVModel: true
});
</script>

<template>
  <UFormGroup :label="label" :name="name" :error="errors[0]">
    <UInput v-model="modelValue"></UInput>
  </UFormGroup>
</template>

<style lang="scss" scoped></style>
