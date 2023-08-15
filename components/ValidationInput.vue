+
<script setup lang="ts">
//const modelValue = defineModel<string | number | undefined>(); currently handled via veevalidate
const props = defineProps(['label', 'name', 'inputUi']);

const { errors, value } = useField<string | number>(() => props.name);
</script>

<template>
  <UFormGroup :label="label" :name="name" :error="errors[0]">
    <UInput :ui="inputUi" v-model="value"></UInput>
  </UFormGroup>
</template>

<style lang="scss" scoped></style>
