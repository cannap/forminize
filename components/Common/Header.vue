<script setup lang="ts">
const { data, signOut } = useAuth();
const { name } = useRoute();

const isIndex = computed(() => name === 'index');
</script>

<template>
  <div
    class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-blur]:bg-background/60"
  >
    <UiContainer class="flex h-20 items-center">
      <div class="ml-auto">
        <NuxtLink
          v-if="isIndex"
          class="btn-link"
          :to="{ name: 'login' }"
          >Login</NuxtLink
        >

        <button
          v-else
          @click="signOut({ callbackUrl: '/login' })"
        >
          <UiAvatar
            v-if="data?.user.image"
            :src="data.user.image"
          />
        </button>
      </div>
    </UiContainer>
  </div>
</template>

<style lang="scss" scoped></style>
