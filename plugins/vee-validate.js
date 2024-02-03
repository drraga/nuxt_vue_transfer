import { defineRule } from 'vee-validate';

export default defineNuxtPlugin(() => {
  defineRule( 'required', value => {
    if(value && value.trim()) return true;
    return 'Поле обязательное для заполнения'
  })

})
