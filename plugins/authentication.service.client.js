import { BehaviorSubject } from "rxjs"; // импортируем ф-ию из RXjs

export default defineNuxtPlugin(async () => { // ф-ия асинхронна укажем
  const { handleResponse } = useHandleResponse(); // деструктурирущее присваивание переиспользуемого метода из composable папки
  const { requestOptions } = useRequestOptions(); // деструктурирущее присваивание переиспользуемого метода из composable папки

  const currentUserSubject = new BehaviorSubject( // создаем объект на основе значений из local storage
    JSON.parse(localStorage.getItem("currentUser")) // используем метод JSON.parse из localStorage с помощью метода getitem по ключу "currentUser"
  );

  const authenticationService = { // создаем объект предоставляет методы
    login, // метод описан ниже
    logout, // метод описан ниже
    currentUser: currentUserSubject.asObservable(), // устанавливаем доступ к текущему пользователю
    get currentUserValue() { // метод который вернет значение пользователя
      return currentUserSubject.value;
    }
  };

async function login(username, password) { // асинхронная фукнция логина
  return fetch( // выполняет запрос на сервер
    `/users/authenticate`, // адрес запроса
    requestOptions.post({ username, password }) // в качестве параметров ф-ия из объекта requestOptions и его метод post 
    // передаем параметры с которыми была вызывана функция
  )
    .then(handleResponse) // после успешного разрешения метода вызываем handleResponse метод с результатом ответа Promise
    .then(user => {
      localStorage.setItem("currentUser", JSON.stringify(user)); // установим в localStorage даные с ключем currentUser и вызовем метод JSON.stringify 
      // передаем ответ в качестве параметра 
      currentUserSubject.next(user); // обновляем значение текущего пользователя

      return user; // вернем значени текущего пользователя
    });
}

// удалим из localStorage данные по ключу и запишем null в переменную currentUser
function logout() {
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}

 // вернем метод, который будет доступен по всему приложению Nuxt
return {
  provide: {
    authenticationService,
  }
}
})
