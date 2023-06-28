<script setup lang="ts">
const { data, signOut } = useAuth();
</script>

<template>
  <div
    class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-blur]:bg-background/60"
  >
    <UiContainer class="flex py-2">
      <button @click="signOut({})" class="ml-auto">
        <UiAvatar v-if="data?.user.image" :src="data.user.image" />
      </button>
    </UiContainer>
  </div>
</template>

<style lang="scss" scoped></style>
