export default () => { // экспортируем модуль

const requestOptions = { // объект прдоставит методы для создания запросов 
  get() {
    return { //вернет
      method: "GET", //название метода
      ...headers() // Spread ф-ии которая возвращает объект с заголовками
    };
  },
  post(body) { // метод в который передаем тело запроса
    return {
      method: "POST",
      ...headers(),
      body: JSON.stringify(body), // создаем тело запроса с помощью метода JSON.stringify
    };
  },
  patch(body) {
    return {
      method: "PATCH",
      ...headers(),
      body: JSON.stringify(body),
    };
  },
  put(body) {
    return {
      method: "PUT",
      ...headers(),
      body: JSON.stringify(body)
    };
  },
  delete() {
    return {
      method: "DELETE",
      ...headers()
    };
  }
};

function headers() {
  const currentUser = useNuxtApp().$authenticationService.currentUserValue || {}; // присвоим переменной значени пользователя из плагина или пустой объект
  const authHeader = currentUser.token // если имеется токен у пользователя 
    ? { Authorization: "Bearer " + currentUser.token } // создаем заголовок 
    : {}; // или пустой объект
  return {
    headers: { // свформируем объект заголовка
      ...authHeader, // распарсим с помощью Spread оператора перменную
      "Content-Type": "application/json" // задаем тип контента в заголовке
    }
  };
}


return {
  requestOptions, // возвращаем методы при обращении к текущему composable
  headers,
};
}
