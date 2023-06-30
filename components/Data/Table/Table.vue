<script setup lang="ts" generic="T extends TableItem">
import { PropType } from 'vue';
import { TableHeader, TableItem } from '@/types';
import dlv from 'dlv';

const props = defineProps({
  headers: {
    type: Array as PropType<TableHeader[]>,
    required: true
  },
  items: {
    type: Array as PropType<T[]>,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});
const slots = useSlots();
const getColumnContent = (
  object: object,
  key: string | Array<string | number>,
  defaultValue?: any
) => {
  const content = dlv(object, key, defaultValue) ?? defaultValue;
  return content;
};
</script>

<template>
  <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
    <thead
      class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
    >
      <tr>
        <th
          scope="col"
          class="px-6 py-3"
          v-for="header in props.headers"
          :key="header.value"
        >
          {{ header.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="(item, index) in props.items"
        :key="index"
      >
        <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
          <td
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            v-for="(header, index) in headers"
            :key="index"
          >
            <slot
              v-if="slots[`item-${header.value}`]"
              :name="`item-${header.value}`"
              v-bind="item"
            />
            <span v-else>
              {{ getColumnContent(item, header.value, header.emptyValue) }}
            </span>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style lang="scss" scoped></style>
