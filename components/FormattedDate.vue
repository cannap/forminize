<script setup lang="ts">
import { format } from 'date-fns';
const props = defineProps(['date']);

const { locale, t } = useI18n();

const formattedDate = computed(() => {
  return format(new Date(props.date), t('date_format'));
});
</script>

<template>
  <time :datetime="props.date">
    {{ formattedDate }}
  </time>
</template>

<style lang="scss" scoped></style>
