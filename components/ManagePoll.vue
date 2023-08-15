<script setup lang="ts">
import { PollSchemaInput } from '@/shared/validations/poll';
const { t } = useI18n();
import { createPollSchema } from '@/shared/validations/poll';
import { toTypedSchema } from '@vee-validate/valibot';
import PollOptions from './PollOptions.vue';
const toast = useToast();
const poll = defineModel<PollSchemaInput>('poll', {
  default: {
    question: '',
    pollOptions: [],
    expires: '',
    voteKey: '',
    isClosed: false,
    startsAt: '',
    endsAt: ''
  }
});
const emits = defineEmits(['save', 'cancel', 'updated']);
const optionsRef = ref<InstanceType<typeof PollOptions> | null>(null);
const { errors, validate, values, meta, errorBag, setValues } = useForm({
  validationSchema: toTypedSchema(createPollSchema),
  initialValues: { ...poll.value }
});

//TODO: those fields are dynamically renderer
const { value: isClosed } = useField<boolean>('isClosed');
const { value: multiple } = useField<boolean>('multiple');

const save = async () => {
  const { valid, errors, values } = await validate();
  if (!valid) return;
  if (!poll.value.id) {
    try {
      const response = await $fetch('/api/polls', {
        method: 'POST',
        body: values
      });

      emits('save', response);
      //  data.value?.polls.push(response);
    } catch (error) {}
  } else {
    try {
      const response = await $fetch<PollSchemaInput>(
        `/api/polls/${poll.value.id}`,
        {
          method: 'PATCH',
          body: values
        }
      );
      emits('updated', response);
      // poll.value = response;
      optionsRef?.value?.updatePollOptions(response.pollOptions);
      toast.add({ color: 'green', title: t('poll_updated') });
    } catch (error) {
      console.log(error);
      toast.add({ color: 'red', title: t('create_poll_failed') });
    }
  }
};

/*
const save = async () => {
  const { valid, errors, values } = await validate();

  if (valid) {
    emits('save', values);
  }
};*/
</script>

<template>
  <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="text-md flex items-center gap-3">
          <LockIcon :state="isClosed" size-class="text-lg" />
          <h3 class="text-lg font-bold">
            {{ poll.id ? $t('edit_poll') : $t('create_poll') }}
          </h3>
        </div>

        <UPopover>
          <UButton
            icon="i-heroicons-wrench-screwdriver"
            variant="soft"
            color="blue"
            >{{ $t('settings') }}</UButton
          >

          <template #panel>
            <div class="flex flex-col gap-2 p-3">
              <UCheckbox
                name="iclosed"
                v-model="isClosed"
                :label="$t('lock_poll')"
              />
              <UCheckbox
                name="multiple"
                v-model="multiple"
                :label="$t('multiple')"
              />
            </div>
          </template>
        </UPopover>
      </div>
    </template>
    <form @submit.prevent="save" class="space-y-4">
      <fieldset class="space-y-4">
        <ValidationInput name="question" :label="$t('question')" />

        <div class="flex gap-4">
          <DatePicker :label="$t('starts_at')" name="startsAt" />
          <DatePicker :label="$t('ends_at')" name="endsAt" />
        </div>
      </fieldset>
      <fieldset>
        <UAlert
          class="mb-4"
          v-if="errors.pollOptions"
          color="orange"
          icon="i-heroicons-shield-exclamation"
          variant="outline"
          :title="$t('min_two_options')"
          >{{ errors.pollOptions }}</UAlert
        >
        <legend class="mb-4 font-bold">
          {{ $t('options') }}
        </legend>

        <PollOptions ref="optionsRef" name="pollOptions" />
      </fieldset>
    </form>

    <template #footer>
      <div class="flex justify-between">
        <UButton @click="emits('cancel')" color="red">
          {{ $t('cancel') }}
        </UButton>

        <UButton type="submit" @click="save" color="green">
          {{ $t('save') }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<style lang="scss" scoped></style>
