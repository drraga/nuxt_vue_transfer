<template>
  <div>
    <div class="alert alert-info">
      <strong>Normal User</strong> - U: user P: user
      <br>
      <strong>Administrator</strong> - U: admin P: admin
    </div>
    <h2>Login</h2>
    
    <VeeForm @submit="onSubmit" v-slot="{ values, errors }">
      <div class="form-group">
        <label for="username">Username</label>
        <VeeField
          type="text"
          v-model.trim="username"
          name="username"
          rules="required"
          class="form-control"
          :class="{ 'is-invalid': errors.username }"
        />
        <VeeErrorMessage name="username" class="invalid-feedback" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <VeeField
          type="password"
          v-model.trim="password"
          name="password"
          rules="required"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
        />
        <VeeErrorMessage name="password" class="invalid-feedback" />
      </div>

      <div class="form-group">
        <button class="btn btn-primary" :disabled="loading">
          <span class="spinner-border spinner-border-sm" v-show="loading"></span>
          <span>Login</span>
        </button>
      </div>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    </VeeForm>
  </div>
</template>

<script setup>
import authGlobal from '~/middleware/auth.global';

const { $authenticationService } = useNuxtApp()
const route = useRoute();
const router = useRouter();

const username = ref('');
const password = ref('');
let submitted = ref(false);
let loading = ref(false);
let returnUrl = ref('');
let errorMessage = ref('');

const onSubmit = (values) => {
  submitted.value = true;

  loading.value = true;
  $authenticationService.login(values.username, values.password)
    .then(
      user => router.push(returnUrl.value),
      error => {
        errorMessage.value = error;
        loading.value = false;
      }
  );
}

onMounted(() => {
  // console.log($authenticationService.currentUserValue);
if ($authenticationService.currentUserValue) {
  router.push("/");
}

returnUrl.value = route.query.returnUrl || "/";
})
console.log();
</script>
