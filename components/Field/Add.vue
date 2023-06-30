<script setup lang="ts">
const { params } = useRoute();

const formData = reactive({ placeholder: '', label: '' });

async function addFieldToForm() {
  const result = await $fetch('/api/inputs', {
    method: 'POST',
    body: {
      formId: params.formId,
      ...formData
    }
  });
}
</script>

<template>
  <UiForm @submit.prevent="addFieldToForm">
    <UiTitle>
      Create Field

      <template #subline>Lol</template>
    </UiTitle>
    <UiInput label="Label" v-model="formData.label" id="label" />
    <UiInput
      label="Placeholder"
      v-model="formData.placeholder"
      id="placeholder"
    />
    <UiButton type="submit">Create Field</UiButton>
  </UiForm>
</template>

<style lang="scss" scoped></style>
