<script setup lang="ts">
import { PropType } from 'vue';
const props = defineProps({
  level: {
    type: Number as PropType<1 | 2 | 3 | 4 | 5 | 6>,
    default: 2
  }
});

const slots = useSlots();

const hasSubline = computed(() => !!slots.subline);

const titleClass = computed(() => {
  switch (props.level) {
    default:
      return 'text-lg font-semibold';
      break;
  }
});

const titleTag = computed(() => 'h' + props.level);
</script>

<template>
  <div class="flex flex-col space-y-2">
    <component :class="titleClass" :is="titleTag"><slot></slot></component>
    <p v-if="hasSubline" class="text-sm"><slot name="subline"></slot></p>
  </div>
</template>

<style lang="scss" scoped></style>
