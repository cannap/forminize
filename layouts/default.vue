<script setup lang="ts"></script>
<template>
  <div class="flex min-h-screen flex-col space-y-6">
    <CommonHeader />

    <UiContainer class="w-full flex-1">
      <main class="flex flex-col">
        <slot />
      </main>
    </UiContainer>
    <footer class="border-t">
      <UiContainer
        class="flex flex-col items-center justify-between gap-6 py-10 md:h-24 md:flex-row md:py-0"
      >
        Footer
      </UiContainer>
    </footer>
  </div>
</template>
