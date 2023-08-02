<script setup lang="ts">
const a = async (bla) => {
  console.log(bla);
};
</script>

<template>
  <div class="" id="div">
    <UFormGroup error="Test" name="test" label="Test">
      <UInput
        placeholder="you@example.com"
        trailing-icon="i-heroicons-exclamation-triangle-20-solid"
      />
    </UFormGroup>
    <UButton @click="a('HUI')">Lol</UButton>
  </div>
</template>

<style lang="scss" scoped></style>
