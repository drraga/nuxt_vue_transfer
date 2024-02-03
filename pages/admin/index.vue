<template>
  <div>
    <h1>Admin</h1>
    <p>This page can only be accessed by administrators.</p>
    <div>
      All users from secure (admin only) api end point:
      <ul v-if="users.length">
        <li v-for="user in users" :key="user.id">
          {{ user.firstName + " " + user.lastName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { userService } = useUserService();
const { $authenticationService } = useNuxtApp();


const users = ref([]);

onMounted( async () => {
  let user = $authenticationService.currentUserValue;
  
  try {
    const fetchedUsers = await userService.getAll();
    users.value = fetchedUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
})
  
</script>