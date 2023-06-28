<script setup lang="ts">
import { TableHeader } from '@/types';
definePageMeta({
  middleware: 'auth'
});

const drawerIsOpen = ref(false);

const { data, pending, refresh } = await useFetch('/api/forms');
const headers: TableHeader[] = [
  {
    label: 'Titel',
    value: 'title'
  },
  {
    label: 'Description',
    value: 'description',
    emptyValue: '-'
  },
  { label: 'Fields', value: 'fields' },
  { label: 'Action', value: 'action' }
];
</script>

<template>
  <div>
    <UiDrawer left v-model="drawerIsOpen"> </UiDrawer>
    <div class="flex items-center justify-between">
      <UiHeadline>
        Dashboard
        <template #subline> Manage your forms </template>
      </UiHeadline>
      <UiButton @click="drawerIsOpen = !drawerIsOpen" class="btn-link"
        >Create</UiButton
      >
    </div>
    <div>
      <DataTable
        v-if="data?.records.length"
        :items="data.records"
        :loading="pending"
        :headers="headers"
      >
        <template #item-action="{ id }">
          {{ id }}
        </template>

        <template #item-fields="{ fields }">
          {{ fields.length }}
        </template>
      </DataTable>
      <UiCard class="flex min-h-[400px] items-center justify-center">
        <div class="space-y-2 text-center">
          <h2 class="text-xl font-semibold">No Forms</h2>
          <p>Create new One</p>
        </div>
      </UiCard>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
