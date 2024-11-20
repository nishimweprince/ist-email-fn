<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// Redirect to the login page
const navigateToLogin = () => {
  router.push('/auth/login');
};
</script>

<template>
  <main class="min-h-screen bg-background flex flex-col items-center justify-center">
    <h1 class="text-primary text-4xl font-bold mb-6">Welcome to Our Service</h1>
    <p class="text-gray-600 text-lg mb-10 text-center">
      Experience the best services with a simple and secure platform.
    </p>
    <button
      @click="navigateToLogin"
      class="bg-primary text-white py-3 px-6 rounded-md shadow-md hover:bg-primary-dark transition"
    >
      Get Started
    </button>
  </main>
</template>

<style scoped>
/* Custom styles for the landing page */
.bg-background {
  background-color: #f4f4f4; /* Light gray background */
}

.text-primary {
  color: #174655; /* Primary theme color */
}

.bg-primary {
  background-color: #174655; /* Primary button background */
}

.bg-primary-dark {
  background-color: #123840; /* Darker shade for hover effect */
}
</style>
