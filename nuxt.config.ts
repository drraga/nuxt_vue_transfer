export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: '//netdna.bootstrapcdn.com/bootstrap/4.2.0/css/bootstrap.min.css' }],
    }
  },
  modules: [
    '@vee-validate/nuxt',
  ],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  build: {
    transpile: ['rxjs']
  },
})
