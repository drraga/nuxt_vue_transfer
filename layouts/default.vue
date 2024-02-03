<template>
    <div>
    <nav v-if="currentUser" class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav">
        <NuxtLink to="/" class="nav-item nav-link">Home</NuxtLink>
        <NuxtLink v-if="isAdmin" to="/admin" class="nav-item nav-link">Admin</NuxtLink>
        <NuxtLink @click="logout" class="nav-item nav-link">Logout</NuxtLink>
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
const { $authenticationService } = useNuxtApp();
const route = useRoute();
const router = useRouter();

let currentUser = ref(null);

const logout = () => {
  $authenticationService.logout();
  router.push("/login");
}

const isAdmin = computed(() => {
  return currentUser.value && currentUser.value.role === useRole.Admin;
});

onMounted(() => {
  $authenticationService.currentUser.subscribe(x => (currentUser.value = x));
})
</script>

<style>
a {
  cursor: pointer;
}
</style>