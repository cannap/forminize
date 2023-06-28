<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
    <img class="aspect-square h-full w-full" :src="src" />
  </span>
</template>

<style lang="scss" scoped></style>
