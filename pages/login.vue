<script setup lang="ts">
definePageMeta({
  layout: 'auth',

  middleware: [
    function (to, from) {
      const { status } = useAuth();
      if (status.value === 'authenticated') {
        return navigateTo('/dashboard');
      }
    }
  ]
  /* auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/dashboard'
  }*/
});

const { signIn } = useAuth();
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <button
      @click="signIn('github', { callbackUrl: '/dashboard' })"
      class="flex items-center gap-2 rounded-lg border px-5 py-2.5 hover:bg-slate-100"
    >
      <Icon size="24" name="mdi:github"></Icon> Github
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
