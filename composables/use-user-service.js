
export default () => {
  
  const { requestOptions } = useRequestOptions();
  const { handleResponse } = useHandleResponse();

  const userService = {
    getAll,
    getById
  };
  
  function getAll() {
    return fetch(`/users`, requestOptions.get()).then(handleResponse);
  }
  
  function getById(id) {
    return fetch(`/users/${id}`, requestOptions.get()).then(handleResponse);
  }

  return {
    userService,
  }
}