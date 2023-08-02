<script setup lang="ts">
const localePath = useLocalePath();

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
});
const { links } = sharedSettings();
</script>

<template>
  <UContainer class="grid flex-1 gap-12 md:grid-cols-[220px_1fr]">
    <UVerticalNavigation :links="links" />
    <NuxtPage class="w-full" />
  </UContainer>
</template>

<style lang="scss" scoped></style>
