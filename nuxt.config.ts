// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ui: {
    icons: ['mdi', 'heroicons']
  },
  runtimeConfig: {
    database: {
      username: '',
      password: '',
      url: '',
      host: ''
    },
    github: {
      clientId: '',
      secret: ''
    }
  },
  i18n: {
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en-US',
    strategy: 'no_prefix',
    vueI18n: 'config/i18n.ts',
    locales: [
      {
        code: 'en-US',
        file: 'en.json',
        name: 'English'
      },
      {
        code: 'de-DE',
        file: 'de.json',
        name: 'Deutsch'
      }
    ]
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
      bodyAttrs: {
        class: 'overflow-x-hidden dark:bg-gray-900 '
      }
    }
  },

  experimental: {
    watcher: 'parcel',
    componentIslands: true
  },

  modules: [
    '@nuxt/devtools',
    '@nuxthq/ui',
    '@vee-validate/nuxt',
    'nuxt-icon',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-vitest',
    '@sidebase/nuxt-auth'
  ],

  plugins: [],

  devtools: {
    timeline: {
      enabled: true
    }
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  }
});
