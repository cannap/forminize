// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    vue: {
      script: {
        defineModel: true
      }
    }
  },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  app: {
    head: {
      bodyAttrs: {
        class: 'bg-background'
      }
    }
  },
  experimental: { typedPages: false, componentIslands: true },
  modules: [
    '@nuxt/devtools',
    'nuxt-icon',
    '@vueuse/nuxt',
    'nuxt-vitest',
    '@sidebase/nuxt-auth'
  ]
});
