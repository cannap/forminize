<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: [
    function (to, from) {
      return;
      //When loggedin redirect to dashboard
      const { status } = useAuth();
      if (status.value === 'authenticated') {
        return navigateTo('/dashboard');
      }
    }
  ]
});
</script>

<template>
  <div class="flex h-screen items-center justify-center px-6 py-12 lg:px-8">
    <Auth></Auth>
  </div>
</template>

<style lang="scss" scoped></style>
