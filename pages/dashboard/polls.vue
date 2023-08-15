<script setup lang="ts">
import { type PollSchemaInput } from '@/shared/validations/poll';

import { addDays } from 'date-fns';

const toast = useToast();
const { t } = useI18n();
const { data, pending, error, refresh } = useFetch('/api/polls');

const pollColumns = computed(() => [
  {
    key: 'isClosed',
    label: 'Locked'
  },
  {
    key: 'question',
    label: t('question')
  },
  { key: 'startsAt', label: t('starts_at') },
  { key: 'actions', label: t('actions') }
]);

const modalOpen = ref(false);
const editing = ref(false);
const initalState = (): PollSchemaInput => {
  return {
    captcha: false,
    question: 'remove after dev',
    pollOptions: [{ answer: 'eins', isNew: true, id: uid(), order: 1 }],
    id: undefined,
    multiple: false,
    isClosed: false,
    startsAt: new Date(),
    endsAt: addDays(new Date(), 1)
  };
};
const poll = ref<PollSchemaInput>(initalState());

const reset = () => {
  editing.value = false;
  modalOpen.value = false;
};

const save = (newPoll) => {
  data.value?.polls.unshift(newPoll);
  modalOpen.value = false;
  toast.add({ color: 'green', title: t('poll_added') });
};

const removePoll = async (id) => {
  if (data.value?.polls) {
    const response = await $fetch(`/api/polls/${id}`, {
      method: 'DELETE'
    });

    data.value.polls = data.value.polls.filter((poll) => id !== poll.id);
  }
  //  commit();
};

const updatePoll = (updatedPoll) => {
  const pollIndex = data.value?.polls.findIndex(
    (po) => updatedPoll.id === po.id
  );

  const { pollOptions, ...poll } = updatedPoll;

  if (data?.value?.polls && pollIndex !== undefined && pollIndex > -1) {
    data.value.polls[pollIndex] = poll;
  }
};

const createNew = () => {
  editing.value = false;
  Object.assign(poll.value, initalState());
  modalOpen.value = true;
};

const actions = (row: PollSchemaInput) => [
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
          await removePoll(row.id);
        } catch (error) {}
      }
    }
  ]
];
</script>

<template>
  <div>
    <UModal @close="reset" v-model="modalOpen">
      <ManagePoll
        @updated="updatePoll"
        @save="save"
        @cancel="reset"
        v-model:poll="poll"
      >
      </ManagePoll>
    </UModal>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <DashboardTitle>{{ $t('polls') }}</DashboardTitle>
          <div class="flex gap-2">
            <UTooltip :text="$t('refresh')">
              <UButton
                size="xs"
                color="blue"
                variant="soft"
                icon="i-heroicons-arrow-path"
                @click="refresh"
              />
            </UTooltip>
            <UButton
              size="xs"
              variant="soft"
              color="green"
              icon="i-heroicons-plus"
              @click="createNew"
              >{{ $t('create_poll') }}</UButton
            >
          </div>
        </div>
      </template>
      <UTable
        :columns="pollColumns"
        :loading="pending"
        :ui="{ wrapper: 'z-10' }"
        :rows="data?.polls"
      >
        <template #isClosed-data="{ row }">
          <LockIcon :state="row.isClosed"></LockIcon>
        </template>
        <template #actions-data="{ row }">
          <div class="flex items-center gap-4">
            <UDropdown :items="actions(row)">
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-ellipsis-horizontal-20-solid"
              />
            </UDropdown>

            <UButton @click="removePoll(row.id)" color="red" variant="ghost"
              >Del</UButton
            >
          </div>
        </template>
        <template #startsAt-data="{ row }">
          <FormattedDate :date="row.startsAt" /> -
          <FormattedDate :date="row.endsAt" />
        </template> </UTable
    ></UCard>
  </div>
</template>

<style lang="scss" scoped></style>
