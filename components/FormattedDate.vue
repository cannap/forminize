<script setup lang="ts">
import { format } from 'date-fns';
const props = defineProps(['date']);

const { locale, t } = useI18n();

const formattedDate = computed(() => {
  // return format(new Date(), t('date_format'));
  const formatter = Intl.DateTimeFormat(locale.value, {
    dateStyle: 'short',
    timeStyle: 'short'
  });
  return formatter.format(new Date(props.date));
});
</script>

<template>
  <time :datetime="props.date">
    {{ formattedDate }}
  </time>
</template>

<style lang="scss" scoped></style>
