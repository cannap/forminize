<script setup lang="ts">
const isOpen = ref(false);
definePageMeta({
  redirect: { name: 'dashboard-polls' }
});
</script>

<template>
  <UContainer>
    <DashboardTitle>{{ $t('dashboard') }}</DashboardTitle>
    <UButton label="Open" @click="isOpen = true" />

    <USlideover v-model="isOpen">
      <!-- Content -->
    </USlideover>
  </UContainer>
</template>

<style lang="scss" scoped></style>
