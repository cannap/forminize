<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const availableLocales = computed<any>(() => {
  return locales.value;
  //return locales.value.filter((i) => i.code !== locale.value);
});
</script>

<template>
  <div class="flex gap-2">
    <a
      v-for="locale in availableLocales"
      :key="locale.code"
      href="#"
      @click.prevent="setLocale(locale.code)"
      >{{ locale.name }}</a
    >
  </div>
</template>

<style lang="scss" scoped></style>
