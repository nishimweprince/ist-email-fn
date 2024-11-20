<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '@/components/inputs/BaseInput.vue';
import BaseButton from '@/components/inputs/BaseButton.vue';
import axios from 'axios';

const router = useRouter();
const otp = ref('');

const verifyOtp = async () => {
    try {
        const response = await axios.post('/auth/verify', { otp: otp.value });
        if (response.status === 200) {
            alert('Verification successful! You can now log in.');
            router.push('/auth/login');
        } else {
            alert('Verification failed! Please try again.');
        }
    } catch (error) {
        console.error('Error during verification:', error);
        alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
};
</script>

<template>
    <main class="bg-background min-h-screen flex items-center justify-center">
        <form @submit.prevent="verifyOtp"
            class="w-[90%] md:w-[50%] lg:w-[40%] xl:w-[35%] mx-auto flex flex-col gap-4 p-4 md:p-6 rounded-md shadow-md bg-white">
            <h2 class="text-center text-lg font-bold">Email Verification</h2>
            <BaseInput v-model="otp" name="otp" type="text" label="Enter OTP"
                placeholder="Enter the OTP sent to your email" />
            <BaseButton type="submit">Verify</BaseButton>
        </form>
    </main>
</template>
