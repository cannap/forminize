<script setup lang="ts">
const slots = useSlots();
</script>

<template>
  <div>
    <h1 class="text-3xl md:text-4xl">
      <slot></slot>
    </h1>
    <p v-if="slots.subline">
      <slot name="subline"></slot>
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
