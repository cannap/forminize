<script setup lang="ts">
const { data } = useAuth();
</script>

<template>
  <div
    v-if="data?.user"
    class="sticky top-0 z-50 w-full border-b bg-gray-100 py-4 dark:border-gray-800 dark:bg-gray-900"
  >
    <UContainer class="flex items-center justify-between">
      <Logo class="text-blue-600" />
      <div class="flex gap-4">
        <UserDropdown />
        <UTooltip :text="$t('switch_color')"> <ColorSwitcher /></UTooltip>
      </div>
    </UContainer>
  </div>
</template>

<style lang="scss" scoped></style>
