export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      // импорт стилей из бутстрапа
      link: [{ rel: 'stylesheet', href: '//netdna.bootstrapcdn.com/bootstrap/4.2.0/css/bootstrap.min.css' }],
    }
  },
  // импорт модуля для Nuxt
  modules: [
    '@vee-validate/nuxt',
  ],
  // правила для veeValidate автоимпорт по всему приложению и задание значений для именования полей
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  // необходимо для работы Rxjs
  build: {
    transpile: ['rxjs']
  },
  // необхоимо использовать така как local storage не существует на сервере
  ssr: false,
})
