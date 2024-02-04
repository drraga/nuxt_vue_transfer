export const useHandleResponse = () => {
const { $authenticationService } = useNuxtApp() // используем метод из плагин

const handleResponse = (response) => { // ф-ия принимает значение ответа от HTTP запроса
  return response.text().then(text => { // извлекаем тело ответа в виде текста методом text()
    const data = text && JSON.parse(text); // если существует тело ответа и не является falsy то парсим тело ответа в переменную с помощью метода JSON.parse
    if (!response.ok) { // если ответ с ошибкой
      if ([401, 403].indexOf(response.status) !== -1) { // если в response.status имеется 401 (данные не действительные) или 403 (прав нет) ошибки
        $authenticationService.logout(); // вызываем метод из плагина 
        location.reload(true); // вызываем перезагрузку страницы
      }

      const error = (data && data.message) || response.statusText; // создаем ошибку если имеется тело ответа и у него есть поле message иначе вернет undefined
      // или возвращаем statusText если первое условие будет ложным
      return Promise.reject(error); // вернем промис со значением ошибки
    }

    return data; // возвращаем данные после успешного JSON.parse
  });
}

return {
  handleResponse, // возвращаем метод
};
}
