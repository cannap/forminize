<script setup lang="ts">
const { signIn } = useAuth();

const login = async () => {
  try {
    const {} = await signIn('github', { callbackUrl: '/dashboard' });
  } catch (error) {
    console.log('dashboard');
  }
};
</script>

<template>
  <UCard class="text-center">
    <UIcon
      class="text-4xl text-indigo-600"
      name="i-heroicons-academic-cap"
    ></UIcon>
    <h2 class="text-2xl">{{ $t('sign_in') }}</h2>
    <p class="mt-2 text-center text-gray-500">
      {{ $t('sign_in_to_continue') }}
    </p>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <UButton @click="login" size="xl" block color="white" icon="i-mdi-github"
        >Login</UButton
      >
    </div>
  </UCard>
</template>

<style lang="scss" scoped></style>
