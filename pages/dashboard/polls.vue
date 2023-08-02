<script setup lang="ts">
import { PollSchema, createPollSchema } from '@/shared/validations/poll';

import { add } from 'date-fns';
import { parse } from 'valibot';

const { t } = useI18n();
const { data, pending, error, refresh } = useFetch('/api/polls');

const pollColumns = computed(() => [
  {
    key: 'question',
    label: t('question')
  },
  { key: 'startsAt', label: t('starts_at') },
  { key: 'actions', label: t('actions') }
]);

const modalOpen = ref(false);
const editing = ref(false);
const initalState = (): PollSchema => {
  return {
    captcha: false,
    question: '',
    pollOptions: [],
    id: undefined,
    isClosed: false,
    startsAt: new Date(),
    endsAt: add(new Date(), { days: 1 })
  };
};
const poll = ref<PollSchema>(initalState());

const reset = () => {
  editing.value = false;
  modalOpen.value = false;
};

const save = async (values) => {
  if (!poll.value.id) {
    try {
      const response = await $fetch('/api/polls', {
        method: 'POST',
        body: poll.value
      });

      if (data.value?.polls.length === 0) {
        data.value?.polls.push(response);
      }
    } catch (error) {}
  }
};

const removePoll = (id) => {
  if (data.value?.polls) {
    data.value.polls = data.value.polls.filter((poll) => id !== poll.id);
    /*  if (pollIndex > -1) {
      data.value.polls.splice(pollIndex, 1);
    }*/
  }
  //  commit();
};

const createNew = () => {
  editing.value = false;
  Object.assign(poll.value, initalState());
  modalOpen.value = true;
};

const actions = (row: PollSchema) => [
  [
    {
      label: t('edit'),
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        editing.value = true;
        poll.value = structuredClone(toRaw(row));
        modalOpen.value = true;
      }
    },
    {
      label: t('delete'),
      icon: 'i-heroicons-trash-20-solid',
      click: async () => {
        try {
          const response = await $fetch(`/api/polls/${row.id}`, {
            method: 'DELETE'
          });

          removePoll(row.id);
        } catch (error) {}
      }
    }
  ]
];
</script>

<template>
  <div>
    <div class="mb-6 flex justify-between">
      <DashboardTitle>{{ $t('polls') }}</DashboardTitle>
      <UButton @click="createNew">{{ $t('create_poll') }}</UButton>
    </div>
    <UModal @close="reset" v-model="modalOpen">
      <ManagePoll @save="save" @cancel="reset" v-model:poll="poll">
      </ManagePoll>
    </UModal>

    <UTable
      :columns="pollColumns"
      :loading="pending"
      :ui="{ wrapper: 'z-10' }"
      :rows="data?.polls"
    >
      <template #actions-data="{ row }">
        <UDropdown :items="actions(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
      <template #startsAt-data="{ row }">
        <FormattedDate :date="row.startsAt" />
      </template>
    </UTable>
  </div>
</template>

<style lang="scss" scoped></style>
