<script setup lang="ts">
import VueDatePicker, {
  DatePickerInstance,
  VueDatePickerProps
} from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { PropType } from 'vue';
const modelValue = defineModel();
const colorMode = useColorMode();

//TODO: Props
//const props = defineProps(['label', 'name']);

const inputClass =
  'form-input relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 ps-9';

const isDark = computed(() => {
  return colorMode.value === 'dark';
});

const picker = ref<DatePickerInstance>(null);

const props = defineProps({
  datepicker: { type: Object as PropType<VueDatePickerProps> },
  error: { type: String, default: '' },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String
  }
});
const { errors, setValue } = useField(() => props.name, undefined, {
  syncVModel: true,
  validateOnValueUpdate: true
});

const { locale } = useI18n();

const setDate = (date) => {
  console.log(date);
  setValue(date);
};
</script>

<template>
  <UFormGroup :label="label" :error="errors[0]">
    <VueDatePicker
      auto-apply
      :name="name"
      :close-on-auto-apply="false"
      teleport-center
      @update:model-value="setDate"
      v-bind="props.datepicker"
      ref="picker"
      :clearable="false"
      :input-class-name="inputClass"
      :format="$t('date_format')"
      :dark="isDark"
      :locale="locale"
      v-model="modelValue"
    ></VueDatePicker>
  </UFormGroup>
</template>

<style lang="scss">
.dp__theme_dark {
  --dp-background-color: #212121;
  --dp-text-color: #ffffff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #ffffff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #005cb2;
  --dp-primary-text-color: #ffffff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-highlight-color: rgba(0, 92, 178, 0.2);
}

.dp__theme_light {
  --dp-background-color: #ffffff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #1976d2;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-highlight-color: rgba(25, 118, 210, 0.1);
}
</style>
