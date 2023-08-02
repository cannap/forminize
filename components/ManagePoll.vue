<script setup lang="ts">
import { PollSchema } from '@/shared/validations/poll';
const modelValue = defineModel({ type: Boolean, default: false });
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
import { parse } from 'valibot';
const { t } = useI18n();
import { createPollSchema } from '@/shared/validations/poll';
import { toTypedSchema } from '@vee-validate/valibot';

//const { history, commit, undo, redo } = useManualRefHistory(pollOptions);
const newOption = ref<string>('');
const newOptionError = ref('');

const poll = defineModel<PollSchema>('poll', {
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

const { errors, validate } = useForm({
  validationSchema: toTypedSchema(createPollSchema),
  initialValues: { ...poll.value }
});

const emits = defineEmits(['save', 'cancel']);

/** Just For demo  */

const updateOption = (event: string, i: number) => {
  poll.value.pollOptions[i].answer = event;
};

const removeOption = (i) => {
  //pollOptions.value = pollOptions.value.filter((answer) => i !== answer);
  poll.value.pollOptions.splice(i, 1);
  //  commit();
};
const addOption = () => {
  // console.log(newOption.value.length);
  if (newOption.value.length <= 0) {
    newOptionError.value = t('required');
    return;
  }

  newOptionError.value = '';
  poll.value.pollOptions.push({ answer: newOption.value, id: uid() });
  newOption.value = '';
};

const lockTooltip = computed(() => {
  return poll.value.isClosed ? t('poll_is_locked') : t('poll_is_unlocked');
});

const lockIcon = computed(() => {
  return poll.value.isClosed
    ? 'i-heroicons-lock-closed'
    : 'i-heroicons-lock-open';
});

const save = async () => {
  const parsed = parse(createPollSchema, poll.value);
  console.log(parsed);

  const { valid, errors, values } = await validate();
  console.log(valid, values);
  if (valid) {
    emits('save', values);
  }
};
</script>

<template>
  <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="text-md flex items-center gap-3">
          <UTooltip :popper="{ placement: 'top' }" :text="lockTooltip">
            <UIcon class="text-lg" :name="lockIcon" />
          </UTooltip>
          <h3 class="text-lg font-bold">
            {{ poll.id ? $t('edit_poll') : $t('create_poll') }}
          </h3>
        </div>

        <UPopover>
          <UButton icon="i-heroicons-wrench-screwdriver" variant="ghost">{{
            $t('settings')
          }}</UButton>

          <template #panel>
            <div class="p-4">
              <UCheckbox
                v-model="poll.isClosed"
                name="lock"
                :label="$t('lock_poll')"
              />
            </div>
          </template>
        </UPopover>
      </div>
    </template>
    <form @submit.prevent="save" class="space-y-4">
      <fieldset class="space-y-4">
        <ValidationInput
          v-model="poll.question"
          name="question"
          :label="$t('question')"
        />

        <div class="flex gap-4">
          <DatePicker
            v-model="poll.startsAt"
            :label="$t('starts_at')"
            name="starts_at"
          ></DatePicker>

          <DatePicker
            v-model="poll.endsAt"
            :label="$t('ends_at')"
            name="ends_at"
          ></DatePicker>

          <!--   <UFormGroup
            @click="startsAtPicker?.openMenu()"
            name="starts_at"
            :label="$t('starts_at')"
          >
            <DatePicker
              v-bind="startsAt"
              @e-ref="(el) => (startsAtPicker = el)"
              name="starts_at"
              v-model="poll.startsAt"
            />
            >
          </UFormGroup>
        -->
          <!--  <UFormGroup @click="endsAtPicker?.openMenu()" :label="$t('ends_at')">
            <DatePicker
              @e-ref="(el) => (endsAtPicker = el)"
              name="ends_at"
              v-model="poll.endsAt"
            />
          </UFormGroup> -->
        </div>
      </fieldset>
      <fieldset>
        <legend class="mb-4 font-bold">
          {{ $t('options') }}
        </legend>
        <div
          class="mb-4 flex gap-2"
          :key="i"
          v-for="(option, i) in poll.pollOptions"
        >
          <UButton
            color="gray"
            icon="i-heroicons-bars-2"
            variant="ghost"
          ></UButton>
          <UInput
            :ui="{ wrapper: 'flex-auto' }"
            @update:model-value="updateOption($event, i)"
            :model-value="option.answer"
          />
          <UButton
            @click="removeOption(i)"
            class="flex"
            icon="i-heroicons-trash"
            size="sm"
            color="red"
            variant="outline"
          />
        </div>
      </fieldset>
    </form>
    <UFormGroup :error="newOptionError" :label="$t('option')" name="add_new">
      <div class="flex gap-2">
        <UInput
          :ui="{ wrapper: 'flex-auto' }"
          @keyup.enter="addOption"
          v-model="newOption"
        >
        </UInput>
        <UButton
          icon="i-heroicons-check"
          size="sm"
          @click="addOption"
          color="green"
          variant="outline"
        />
      </div>
    </UFormGroup>

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
