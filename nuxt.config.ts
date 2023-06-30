// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
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
  experimental: {
    watcher: 'parcel'
  },

  modules: [
    '@nuxt/devtools',
    '@vee-validate/nuxt',
    'nuxt-icon',
    '@vueuse/nuxt',
    'nuxt-vitest',
    '@sidebase/nuxt-auth'
  ]
});
