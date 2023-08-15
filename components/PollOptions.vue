<script setup lang="ts">
import { PollOptionsSchema } from '@/shared/validations/poll';
import { useSortable } from '@vueuse/integrations/useSortable';
const el = ref<HTMLElement | null>(null);
const { t } = useI18n();
const newOption = ref('');
const newOptionError = ref('');
const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

const {
  fields,
  push: pushOption,
  remove: removeOptionByIdx,
  swap: swapOptions,
  update: updateOption,
  replace: replaceOptions
} = useFieldArray<PollOptionsSchema>(props.name);

const updatePollOptions = (newOptions: PollOptionsSchema[]) => {
  replaceOptions(newOptions);
};

defineExpose({ updatePollOptions });
//TODO: update before we save
const updateOrder = () => {
  fields.value.forEach((el, i) => {
    updateOption(i, { ...el.value, order: i + 1 });
  });
};

useSortable(el, fields, {
  handle: '.handle',
  animation: 150,
  onUpdate: (e) => {
    swapOptions(e.oldIndex, e.newIndex);

    updateOrder();
  }
});

const addOption = () => {
  if (newOption.value.length <= 0) {
    newOptionError.value = t('required');
    return;
  }

  newOptionError.value = '';

  const currentOptionsLen = fields.value.length;

  pushOption({
    answer: newOption.value,
    order: currentOptionsLen + 1,
    id: uid(),
    isNew: true
  });
  newOption.value = '';
};

const removeOption = (i: number) => {
  //pollOptions.value = pollOptions.value.filter((answer) => i !== answer);
  removeOptionByIdx(i);
  updateOrder();
  //  commit();
};
</script>

<template>
  <div ref="el">
    <div
      :data-order="field.value.order"
      class="mb-4 flex w-full items-center gap-2 rounded-md border border-gray-500/10 p-2"
      :key="field.value.id"
      v-for="(field, idx) in fields"
    >
      <UButton
        color="gray"
        icon="i-heroicons-bars-2"
        class="handle self-start"
        variant="ghost"
      />

      <ValidationInput class="flex-auto" :name="`pollOptions[${idx}].answer`" />
      <UButton
        @click="removeOption(idx)"
        class="self-start"
        icon="i-heroicons-trash"
        size="sm"
        color="red"
        variant="outline"
      />
    </div>
  </div>
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
</template>

<style lang="scss" scoped></style>
