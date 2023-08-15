<script setup lang="ts">
import { boolean } from 'valibot';

//
const props = defineProps({
  state: {
    type: Boolean,
    required: true
  },
  sizeClass: {
    type: String,
    default: 'text-sm'
  }
});
const { t } = useI18n();
const lockTooltip = computed(() => {
  return props.state ? t('poll_is_locked') : t('poll_is_unlocked');
});

const lockIcon = computed(() => {
  return props.state ? 'i-heroicons-lock-closed' : 'i-heroicons-lock-open';
});
</script>

<template>
  <UTooltip :text="lockTooltip">
    <UIcon
      :class="[
        props.state
          ? 'text-red-500 dark:text-red-400 '
          : 'text-gray-500 dark:text-white',
        sizeClass
      ]"
      :name="lockIcon"
    ></UIcon>
  </UTooltip>
</template>

<style lang="scss" scoped></style>
