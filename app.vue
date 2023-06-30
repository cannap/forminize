<template>
  <NuxtLayout>
    <NuxtPage />
    <DevOnly>
      <div class="fixed bottom-0 right-0">
        {{ useAuth().status }}
      </div>
    </DevOnly>
  </NuxtLayout>
</template>
