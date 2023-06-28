<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/dashboard'
  }
});

const { signIn } = useAuth();
</script>

<template>
  <div
    class="container flex h-screen w-screen flex-col items-center justify-center"
  >
    <button
      @click="signIn('github', { callbackUrl: '/dashboard' })"
      class="flex items-center gap-2 px-4 py-2"
    >
      <Icon size="24" name="mdi:github"></Icon> Github
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
