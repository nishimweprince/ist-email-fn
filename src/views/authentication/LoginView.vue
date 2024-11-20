<script setup lang="ts">
import { useForm } from 'vee-validate';
import BaseInput from '@/components/inputs/BaseInput.vue';
import * as yup from 'yup';
import BaseButton from '@/components/inputs/BaseButton.vue';
import HeadingComponent from '@/components/inputs/HeadingComponent.vue';
import { API_URL } from '@/constants/environments';
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import store from 'store';

const router = useRouter();

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().required('Email is required').email('Enter a valid email address'),
    password: yup.string().required('Password is required'),
  }),
});

// LOADING STATE
const state = reactive({
  isLoading: false,
  data: null,
  error: null
});

const onSubmit = handleSubmit((values) => {
  state.isLoading = true;
  axios.post(`${API_URL}/auth/login`, values)
    .then(response => {
      const responseData = response.data;
      state.data = responseData.data.data;
      store.set('user', responseData?.data?.user);
      store.set('token', responseData?.data?.token)
      router.push('/dashboard');
    })
    .catch(error => {
      state.error = error;
      console.error(error);
    }).finally(() => {
      state.isLoading = false;
    });
});

</script>

<template>
  <main class="bg-background min-h-screen flex items-center justify-center">
    <form @submit="onSubmit"
      class="w-[90%] md:w-[70%] lg:w-[50%] xl:w-[35%] mx-auto flex flex-col gap-4 p-4 md:p-6 rounded-md shadow-md bg-white">
      <HeadingComponent label="Login" type="h2" class="text-center" />
      <menu class="flex flex-col gap-2">
        <BaseInput name="email" type="text" label="Email" placeholder="Enter your email" />
      </menu>

      <menu class="flex flex-col gap-2">
        <BaseInput name="password" type="password" label="Password" placeholder="Enter your password" />
      </menu>

      <article class="flex items-center justify-between gap-2">
        <ul class="flex items-center gap-2">
          <input type="checkbox" id="remember" name="remember" class="w-4 h-4" />
          <label for="remember" class="text-sm">Remember me</label>
        </ul>
        <BaseButton variant="outline" to="/forgot-password" class="hover:underline">Forgot password?</BaseButton>
      </article>
      <BaseButton type="submit" variant="primary" :isLoading="state.isLoading">Login</BaseButton>
      <p class="text-sm text-center">Don't have an account? <RouterLink to="/auth/register"
          class="text-primary hover:underline">Register</RouterLink>
      </p>
    </form>
  </main>
</template>
