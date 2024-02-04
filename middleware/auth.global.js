export default defineNuxtRouteMiddleware((to, from) => {
  const { $authenticationService} = useNuxtApp(); // импортируем из плагина
  const { authorize } = to.meta; // извлекаем данные в переменную из мета данных маршрута

  if(authorize) { // если имеется meta на  странице (только у home и admin)
    if (!$authenticationService.currentUserValue) { // если пользователь не авторизован, данных в поле нет
      return navigateTo({ path: "/login", query: { returnUrl: to.path } }) // отправляем на страницу login  с указанием откуда хотел пользователь залогиниться
    }

    if (authorize.length && !authorize.includes($authenticationService.currentUserValue.role)) { // если имеется meta на странице, но роль не соответсвует Admin
      return navigateTo({ path: "/" }); // вернем на домашнюю страницу
    }
  }
  // обработаем остальные переходы в приложении если пользователь не авторизован
  if(!authorize && to.path !== '/login') {
    return navigateTo('/login')
  }
})
