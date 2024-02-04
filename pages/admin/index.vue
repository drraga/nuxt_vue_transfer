<template>
  <div>
    <h1>Администратор</h1>
    <p>Эта страница может быть видна только администраторам.</p>
    <div>
      Список всех пользователей из защищенного (только для администраторов) api эндпоинта:
      <ul v-if="users.length">
        <li v-for="user in users" :key="user.id">
          {{ user.firstName + " " + user.lastName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  authorize: [useRole.Admin], // установим значение в meta из composable значения Admin 
})

const { userService } = useUserService(); // импортируем composable 

const users = ref([]); // создадим массив в котором будут значения из асинхронного ответа

onMounted( async () => {
  try {
    const fetchedUsers = await userService.getAll(); // выполняем запрос с использованием метода из модуля userService
    users.value = fetchedUsers; // присвоим ответ в реактивную переменную 
  } catch (error) {
    console.error('Error fetching users:', error); // обработаем ошибки
  }
})
</script>