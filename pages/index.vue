<template>
  <div>
      <h1>Home</h1>
      <p>You're logged in with Vue.js & JWT!!</p>
      <p>Your role is: <strong>{{ currentUser.role }}</strong>.</p>
      <p>This page can be accessed by all authenticated users.</p>
      <div>
          Current user from secure api end point:
          <ul v-if="userFromApi">
              <li>{{ userFromApi.firstName }} {{ userFromApi.lastName }}</li>
          </ul>
      </div>
  </div>
</template>

<script setup>
const { userService } = useUserService();
const { $authenticationService } = useNuxtApp();

let currentUser = ref('')
let userFromApi = ref(null);
currentUser = computed(() => useNuxtApp().$authenticationService.currentUserValue);
// currentUser = computed(() => {
//   if ($authenticationService.currentUserValue) {
//     return $authenticationService.currentUserValue
//   } else {
//     return '';
//   }
// });

onMounted(async () => {
  // currentUser = useNuxtApp().$authenticationService.currentUserValue;

    try {
      const fetchedId = await userService.getById($authenticationService.currentUserValue.id);
      userFromApi.value = fetchedId;
    } catch (error) {
      console.error(`Error message: ${error}`)
    }
})
</script>
