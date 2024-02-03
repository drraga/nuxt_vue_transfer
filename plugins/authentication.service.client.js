import { BehaviorSubject } from "rxjs";

export default defineNuxtPlugin(async (nuxtApp) => {
  const { handleResponse } = useHandleResponse();
  const { requestOptions } = useRequestOptions();

  const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
      return currentUserSubject.value;
    }
  };

function login(username, password) {
  return fetch(
    `/users/authenticate`,
    requestOptions.post({ username, password })
  )
    .then(handleResponse)
    .then(user => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
}

function logout() {
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}

return {
  provide: {
    authenticationService,
  }
}
})

// export const useAuthenticationService = () => {
//   const currentUserSubject = new BehaviorSubject(
//     JSON.parse(localStorage.getItem("currentUser"))
//   );

//   const authenticationService = {
//     login,
//     logout,
//     currentUser: currentUserSubject.asObservable(),
//     get currentUserValue() {
//       return currentUserSubject.value;
//     }
//   };

//   function login(username, password) {
//     return fetch(
//       `/users/authenticate`,
//       requestOptions.post({ username, password })
//     )
//       .then(handleResponse)
//       .then(user => {
//         localStorage.setItem("currentUser", JSON.stringify(user));
//         currentUserSubject.next(user);
//         return user;
//       });
//   }

//   function logout() {
//     localStorage.removeItem("currentUser");
//     currentUserSubject.next(null);
//   }

//   return {
//     authenticationService,
//   };
// };