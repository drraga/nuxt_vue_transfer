<template>
  <div>
      <h1>Домашняя страница</h1>
      <p>Вы залогинены с помощью Vue.js и JWT!!</p>
      <p>Ваша роль: <strong>{{ currentUser?.role }}</strong>.</p>
      <p>Эта страница может быть доступна всем аутентифицированным пользователям.</p>
      <div>
          Текущий пользователь из защищенного api эндпоинта:
          <ul v-if="userFromApi">
              <li>{{ userFromApi.firstName }} {{ userFromApi.lastName }}</li>
          </ul>
      </div>
  </div>
</template>

<script setup>
definePageMeta({
  authorize: [], // задаем meta на странице пустого массива
})

const { userService } = useUserService(); // деструктурируем ф-ию из composable 
const { $authenticationService } = useNuxtApp(); // деструктурируем ф-ию из плагина


let userFromApi = ref(null); // создаем переменную для значений из запроса

let currentUser = computed(() => $authenticationService.currentUserValue); // получим значение пользователя из файла аутентификации

onMounted(() => {
  userService.getById($authenticationService.currentUserValue.id) // запрос по текущему значению id из плагина с файлом аутентификации
    .then((fetchedId) => {
      userFromApi.value = fetchedId; // присвоим значение ответа в реактивную переменную
    })
    .catch((error) => {
      console.error(`Error message: ${error}`); // обработка ошибок
    });
});


</script>
