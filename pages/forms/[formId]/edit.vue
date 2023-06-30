<script setup lang="ts">
const { params } = useRoute();
const drawerIsOpen = ref(false);
const { data } = await useFetch(`/api/forms/${params.formId}`, {});
</script>

<template>
  <div>
    <UiButton @click="drawerIsOpen = !drawerIsOpen">Create Field</UiButton>
    <UiDrawer v-model="drawerIsOpen">
      <FieldAdd></FieldAdd>
    </UiDrawer>
  </div>
</template>

<style lang="scss" scoped></style>
