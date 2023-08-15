<script setup lang="ts">
const {
  params: { pollId }
} = useRoute();
</script>

<template>
  <div>
    {{ pollId }}
  </div>
</template>

<style lang="scss" scoped></style>
