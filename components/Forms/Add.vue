<script setup lang="ts">
const formData = reactive({
  title: ''
});
const emit = defineEmits(['insert']);

const loading = ref(false);

async function addForm() {
  // Todo: Error Handling as example the auth is no longer working maybe create a wrapper for
  loading.value = true;
  const form = await $fetch('/api/forms', {
    method: 'POST',
    body: formData
  });
  loading.value = false;
  emit('insert', form);
}
</script>

<template>
  <UiForm @submit.prevent="addForm">
    <UiInput label="Name" v-model="formData.title" id="name"></UiInput>

    <slot :formData="formData"></slot>
  </UiForm>
</template>

<style lang="scss" scoped></style>
