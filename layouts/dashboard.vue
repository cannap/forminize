<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen flex-col space-y-8">
    <Navbar />
    <div class="flex-1">
      <UContainer class="mb-6">
        <UAlert
          class="mb-2"
          icon="i-heroicons-exclamation-triangle"
          variant="subtle"
          color="red"
          title="Work in Progress"
          :description="$t('global_information_about_app')"
        ></UAlert
      ></UContainer>
      <slot></slot>
    </div>
    <TheFooter />
    <UNotifications />
  </div>
</template>

<style lang="scss" scoped></style>
