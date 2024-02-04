
export default () => {
  
  const { requestOptions } = useRequestOptions(); // импортируем модуль, деструктурирующее присваивание в переменную
  const { handleResponse } = useHandleResponse(); // импортируем модуль, деструктурирующее присваивание в переменную

  const userService = {
    getAll,
    getById
  };
  
  function getAll() {
    return fetch(`/users`, requestOptions.get()).then(handleResponse); // асинхронный запрос с использованием метода из модуля requestOptions
    // вызываем после успешного разрешения промиса handleResponse
  }
  
  function getById(id) {
    return fetch(`/users/${id}`, requestOptions.get()).then(handleResponse); // асинхронный запрос с использованием метода из модуля requestOptions
    // вызываем после успешного разрешения промиса handleResponse
  }
  return {
    userService, // возвращаем объект с указанными методами из файла
  }
}