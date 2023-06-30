<script setup lang="ts">
import { TableHeader } from '@/types';

definePageMeta({
  middleware: 'auth'
});

const formDrawerIsOpen = ref(false);

const { data: forms, pending } = await useFetch('/api/forms');
if (forms.value) {
  forms.value = [...forms.value];
}
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
  {
    label: 'Fields',
    value: 'inputCount',
    emptyValue: 0
  },
  {
    label: 'Action',
    value: 'action'
  }
];
/*
function addForm(value: (typeof data.value.records)[0]) {
  if (typeof data.value === null) return;
  data.value.records.push(value);
  formDrawerIsOpen.value = false;
}*/
</script>

<template>
  <div>
    <UiDrawer v-model="formDrawerIsOpen">
      <FormsAdd></FormsAdd>
    </UiDrawer>
    <div class="flex items-center justify-between">
      <UiHeadline>
        Dashboard
        <template #subline> Manage your forms </template>
      </UiHeadline>
      <UiButton @click="formDrawerIsOpen = !formDrawerIsOpen" class="btn-link"
        >Create</UiButton
      >
    </div>
    <div>
      <DataTable
        v-if="forms && forms.length"
        :items="forms"
        :loading="pending"
        :headers="headers"
      >
        <template #item-action="{ id }">
          <NuxtLink :to="{ name: 'forms-formId-edit', params: { formId: id } }"
            ><Icon name="ic:baseline-more-horiz"
          /></NuxtLink>
        </template>
      </DataTable>
      <UiCard v-else class="flex min-h-[400px] items-center justify-center">
        <div class="space-y-2 text-center">
          <h2 class="text-xl font-semibold">No Forms</h2>
          <p>Create new One</p>
        </div>
      </UiCard>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
