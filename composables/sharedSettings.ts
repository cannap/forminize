export const sharedSettings = () => {
  const { t } = useI18n();
  const localePath = useLocalePath();

  const links = computed(() => [
    {
      label: t('polls'),
      icon: 'i-heroicons-chart-bar',
      to: localePath({ name: 'dashboard-polls' })
    },
    {
      label: t('settings'),
      icon: 'i-heroicons-wrench-screwdriver',
      to: localePath({ name: 'dashboard-settings' })
    }
  ]);

  return { links };
};
