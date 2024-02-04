<template>
  <div>
    <div class="alert alert-info">
      <strong>Обычный пользователь</strong> - Пользователь: user Пароль: user
      <br>
      <strong>Администратор</strong> - Пользователь: admin Пароль: admin
    </div>
    <h2>Логин</h2>
    
    <VeeForm @submit="onSubmit" v-slot="{ errors }">
      <div class="form-group">
        <label for="username">Пользователь</label>
        <VeeField
          type="text"
          v-model.trim="username"
          name="username"
          rules="required"
          class="form-control"
          :class="{ 'is-invalid': errors.username }"
        />
        <VeeErrorMessage name="username" class="invalid-feedback" />
      </div>

      <div class="form-group">
        <label for="password">Пароль</label>
        <VeeField
          type="password"
          v-model.trim="password"
          name="password"
          rules="required"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
        />
        <VeeErrorMessage name="password" class="invalid-feedback" />
      </div>

      <div class="form-group">
        <button class="btn btn-primary" :disabled="loading">
          <span class="spinner-border spinner-border-sm" v-show="loading"></span>
          <span>Логин</span>
        </button>
      </div>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    </VeeForm>
  </div>
</template>

<script setup>
const { $authenticationService } = useNuxtApp() // импорт из плагина authenticationService
const route = useRoute(); // используем route, присваивая переменной
const router = useRouter(); // используем router, присваивая переменной

// создаем блок перменных
const username = ref(''); // значение поля пользователя
const password = ref('');  // значение поля пароль
let loading = ref(false); // флаг для отображения загрузки, имитация запроса на сервер
let returnUrl = ref(''); // переменная под meta для маршрута
let errorMessage = ref(''); // переменная для отображения ошибки под формой

const onSubmit = (values) => { // ф-ия для отправки формы

  loading.value = true; // устанавливаем флаг загрузки в true, отображаем загрузку в кнопке
  $authenticationService.login(values.username, values.password) // вызываем ф-ию из плагина authenticationService, передаем в нее значения из полей формы
    .then(
      (user) => {
        // при успешной аутентификации (разрешении промиса) перейдем по пути
        router.push(returnUrl.value);
      },
      (error) => {
        // в случае ошибки выведем сообщение из fake-backend
        errorMessage.value = error; // присовим в текст оишибки значение Promise
        loading.value = false; // установим флаг загрузки в false
      })
}

onMounted(() => {
if ($authenticationService.currentUserValue) { // если пользователь авторизован, перенаправляем его на домашнюю страницу
  router.push("/");
}

returnUrl.value = route.query.returnUrl || "/"; // установим значение пути по умолчанию если query в текущем route пустой иначе значение из query route
})
</script>
