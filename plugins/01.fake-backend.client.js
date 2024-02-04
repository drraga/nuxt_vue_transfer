export default defineNuxtPlugin( async () => { // асинхронный плагин
  // задаем порядковый номер, чтобы выполнялся первым среди других плагинов. 
  let users = [ // задаем массив пользователей
    {
      id: 1,
      username: "admin",
      password: "admin",
      firstName: "Admin",
      lastName: "User",
      role: useRole.Admin
    },
    {
      id: 2,
      username: "user",
      password: "user",
      firstName: "Normal",
      lastName: "User",
      role: useRole.User
    }
  ];
  let realFetch = window.fetch; // сохраняем реальный fetch в переменную
  window.fetch = function(url, opts) { // определяем свою реализацию метода fetch, передаем параметры url и opts
    const authHeader = opts.headers["Authorization"]; // извлекаем заголовок авторизации из параметров запроса
    const isLoggedIn =
      authHeader && authHeader.startsWith("Bearer fake-jwt-token"); //проверяем авторизован ли пользователь с помощью фейковой авторизации
    const roleString = isLoggedIn && authHeader.split(".")[1]; // если пользователь авторизован, извлекаем вторую часть заголовка. split по символу . выполним
    const role = roleString ? useRole[roleString] : null; // если roleString не пустая строка или null, тогда установим значение из useRole по ключу roleString или null

    return new Promise((resolve, reject) => { // вернем промис
      setTimeout(() => { // установим задержку в 500 мс
        if (url.endsWith("/users/authenticate") && opts.method === "POST") { // если url оканчивается на строку указанную и имеется метод post
          const params = JSON.parse(opts.body); // парсим opts тело запроса
          const user = users.find( // ищем среди указанного массива пользователей переданное значение в параметрах запроса. 
            x =>
              x.username === params.username && x.password === params.password // проверяем чтобы имя и пароль совпадали
          );
          if (!user) return error("Пользователь или пароль некорректные"); // если поля невалидные, вернем error сообщение с ошибкой
          // если пользователи найдены, тогда возращаем ok ответ с объектом и значениями полей
          return ok({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            token: `fake-jwt-token.${user.role}`
          });
        }

        if (url.match(/\/users\/\d+$/) && opts.method === "GET") { // если url совпадает с /users/ далее идет одна и более цифр и метод get
          if (!isLoggedIn) return unauthorised(); // если пользователь незалогинен вызвать метод unauthorised

          let urlParts = url.split("/");
          let id = parseInt(urlParts[urlParts.length - 1]); // извлекаем id пользователя из url

          const currentUser = users.find(x => x.role === role); 
          if (id !== currentUser.id && role !== useRole.Admin) // если текущий пользователь не соответствует запрашиваемому id и не является администратором
            return unauthorised(); // возвращаем ошибку "Unauthorized"

          const user = users.find(x => x.id === id); // находим пользователя с заданным id
          return ok(user); // вызываем ф-ию ok ответ с данными пользователя
        }

        if (url.endsWith("/users") && opts.method === "GET") { // если запрос направлен на получение списка всех пользователей и метод - GET
          if (role !== useRole.Admin) return unauthorised(); // если текущий пользователь не администратор, возвращаем ошибку "Unauthorized"
          return ok(users); // вызываем ф-ию ok, возвращаем пользователей
        }

        realFetch(url, opts).then(response => resolve(response)); // обрабатываем настоящий запрос fetch

        // ф-ия ok разрешит промис со статусом ok и text будет ф-ией которая вернет Promise ф-ией JSON.stringify переданный в параметр тела 
        function ok(body) {
          resolve({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(body))
          });
        }

        // ф-ия ошибки, вызываем с параметром сообщения передаем статус 401 и разрешаем Promise ф-ией JSON.stringify переданный в параметр тела 
        function unauthorised() {
          resolve({
            status: 401,
            text: () =>
              Promise.resolve(JSON.stringify({ message: "Unauthorised" }))
          });
        }

         // ф-ия ошибки, вызываем с параметром сообщения передаем статус 400 и разрешаем Promise ф-ией JSON.stringify переданный в параметр тела 
        function error(message) {
          resolve({
            status: 400,
            text: () => Promise.resolve(JSON.stringify({ message }))
          });
        }
      }, 500);
    });
  };
})