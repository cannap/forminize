<script setup lang="ts">
const { params } = useRoute();

const formData = reactive({ placeholder: '', label: '' });

async function addFieldToForm() {
  const result = await $fetch('/api/fields', {
    method: 'POST',
    body: {
      formId: params.id,
      ...formData
    }
  });
}
</script>

<template>
  <form @submit.prevent="addFieldToForm" class="space-y-4">
    <UiTextField label="Label" v-model="formData.label" id="label" />
    <UiTextField
      label="Placeholder"
      v-model="formData.placeholder"
      id="placeholder"
    />
    <UiButton type="submit">Create Field</UiButton>
  </form>
</template>

<style lang="scss" scoped></style>
