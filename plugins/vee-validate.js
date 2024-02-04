import { defineRule } from 'vee-validate'; // импортируем метод из библиотеки

// вызываем метод Nuxt, экспортируем правило required.  если поле существует и оно не пустая строка - вернем сообщение
export default defineNuxtPlugin(() => { 
  defineRule( 'required', value => { 
    if(value && value.trim()) return true;
    return 'Поле обязательное для заполнения'
  })

})
