<script setup lang="ts">
import { useForm } from 'vee-validate';
import BaseInput from '@/components/inputs/BaseInput.vue';
import BaseButton from '@/components/inputs/BaseButton.vue';
import HeadingComponent from '@/components/inputs/HeadingComponent.vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import axios from 'axios';
import { API_URL } from '@/constants/environments';

const router = useRouter();

const { handleSubmit } = useForm({
    validationSchema: yup.object({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().optional(),
        email: yup.string().required('Email is required').email('Enter a valid email address'),
        phoneNumber: yup.string().optional(),
        password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
        confirmPassword: yup
            .string()
            .required('Confirm Password is required')
            .oneOf([yup.ref('password')], 'Passwords must match'),
    }),
});

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
    try {
        // Call the registration API
        const response = await axios.post(`${API_URL}/auth/register`, {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            password: values.password,
            role: 'STAFF',
        });

        // Check if the response is successful
        if (response.status === 200) {
            alert('Registration successful! Please verify your email.');
            router.push('/auth/verify'); // Redirect to the verification page
        } else {
            alert('Registration failed! Please try again.');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
});
</script>

<template>
    <main class="bg-background min-h-screen flex items-center justify-center">
        <form @submit.prevent="onSubmit"
            class="w-[90%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col gap-4 p-4 md:p-6 rounded-md shadow-md bg-white">
            <HeadingComponent label="Register" type="h2" class="text-center" />
            <fieldset class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseInput name="firstName" type="text" label="First Name" placeholder="Enter your first name" />
                <BaseInput name="lastName" type="text" label="Last Name" placeholder="Enter your last name" />
                <BaseInput name="email" type="text" label="Email" placeholder="Enter your email" />
                <BaseInput name="phoneNumber" type="text" label="Phone Number" placeholder="Enter your phone number" />
                <BaseInput name="password" type="password" label="Password" placeholder="Enter your password" />
                <BaseInput name="confirmPassword" type="password" label="Confirm Password"
                    placeholder="Confirm your password" />
            </fieldset>

            <BaseButton type="submit">Register</BaseButton>
            <p class="text-center text-sm">
                Already have an account? <RouterLink to="/auth/login" class="text-primary hover:underline">Login
                </RouterLink>
            </p>
        </form>
    </main>
</template>
