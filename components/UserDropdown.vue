<script setup lang="ts">
const { links } = sharedSettings();
const { data, signOut } = useAuth();
const { t } = useI18n();

const profilLinks = computed(() => [
  [
    {
      label: 'Account',
      slot: 'account',
      disabled: true
    }
  ],
  links.value,
  [
    {
      label: t('sign_out'),
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: async () => {
        await signOut({ callbackUrl: '/login' });
      }
    }
  ]
]);
</script>

<template>
  <UDropdown
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :items="profilLinks"
  >
    <UAvatar
      :alt="data?.user?.name || undefined"
      :src="data?.user?.image || false"
    ></UAvatar>
    <template #account>
      <div class="text-left">
        <p>{{ data?.user?.name }}</p>
        <p class="text-sm text-gray-400">{{ data?.user?.email }}</p>
      </div>
    </template>
  </UDropdown>
</template>

<style lang="scss" scoped></style>
