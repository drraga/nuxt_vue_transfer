<template>
    <div>
    <nav v-if="currentUser" class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav">
        <NuxtLink to="/" class="nav-item nav-link">Дом</NuxtLink>
        <NuxtLink v-if="isAdmin" to="/admin" class="nav-item nav-link">Администратор</NuxtLink>
        <NuxtLink @click="logout" class="nav-item nav-link">Выход</NuxtLink>
      </div>
    </nav>
    <div class="jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 offset-sm-3">

            <slot />
            
          </div>
        </div>
      </div>
    </div>
  </div>
<div class="text-center">
  <p>
    <NuxtLink
      to="http://jasonwatmore.com/post/2019/03/08/vuejs-role-based-authorization-tutorial-with-example"
      target="_top"
    >
      Vue.js - Role Based Authorization Tutorial & Example
      </NuxtLink>
  </p>
  <p>
    <NuxtLink to="http://jasonwatmore.com" target="_top">JasonWatmore.com</NuxtLink>
  </p>
</div>
</template>

<script setup>
const { $authenticationService } = useNuxtApp(); // импорт из плагина $authenticationService
const router = useRouter(); // импорт router

let currentUser = ref(null); // создаем реактивную переменную

const logout = () => { // ф-иия логаута 
  $authenticationService.logout(); // вызываем ф-ию logout из плагина $authenticationService
  router.push("/login"); // переходим на страницу логина
}

const isAdmin = computed(() => {
  return currentUser.value && currentUser.value.role === useRole.Admin; // проверяем авторизован ли пользователь и установлена ли у него роль админ
});

onMounted(() => {
  $authenticationService.currentUser.subscribe(x => (currentUser.value = x)); // подписываемся на значения текущего пользователя из плагина
  // и задаем значение из плагина в переменную currentUser
})
</script>

<style>
a {
  cursor: pointer;
}
</style>