<script setup lang="ts">
const slots = useSlots();

const hasTopSlot = computed(() => !!slots.top);
</script>

<template>
  <div class="rounded-md p-6 shadow-md">
    <div v-if="hasTopSlot">
      <slot name="top"></slot>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
