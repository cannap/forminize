<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen flex-col space-y-8">
    <Navbar />
    <div class="flex-1">
      <slot></slot>
    </div>
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped></style>
