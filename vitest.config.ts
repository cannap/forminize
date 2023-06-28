import { defineVitestConfig } from 'nuxt-vitest/config';
export default defineVitestConfig({
  test: {
    dir: './components/__tests__',
    // reporters: 'html',
    coverage: {
      // provider: 'istanbul',
      reportsDirectory: 'coverage',
      reporter: 'html',
      exclude: ['.nuxt/**']
    },
    globals: true,
    environment: 'nuxt'
    // you can optionally set nuxt-specific environment options
    // environmentOptions: {
    //   nuxt: {
    //     rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
    //     overrides: {
    //       // other nuxt config you want to pass
    //     }
    //   }
    // }
  }
});
