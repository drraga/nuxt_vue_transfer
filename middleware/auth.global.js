// import authenticationServiceClient from "~/plugins/authentication.service.client"

export default defineNuxtRouteMiddleware((to, from) => {
  const testLogin = false
  const { $authenticationService} = useNuxtApp();
  const { authorize } = to.meta;
  // console.log('router $authenticationService', $authenticationService.currentUserValue);
  // console.log('это мы перейдем вот  сюда', to);
  // const currentUser = $authenticationService;
  // const currentUser = computed(() => useNuxtApp().$authenticationService.currentUser)
// console.log('опять данные из $authenticationService', useNuxtApp().$authenticationService);
// console.log(currentUser);
// console.log('данные маршрута куда', $authenticationService.currentUserValue);


// if(authorize) {
// const currentUser =  false;
// // }
//   // if (authorize) {
  //   if (authorize.length && !authorize.includes(currentUser.role)) {
  //     return navigateTo({ path: "/" });
  //   }
  // }

})
