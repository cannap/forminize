<script setup lang="ts">
export interface Props {
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button'
});
</script>

<template>
  <button
    class="mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    :type="props.type"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped></style>
