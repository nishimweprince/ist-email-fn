<template>
    <div class="max-w-4xl mx-auto p-6 text-center">
        <h1 class="text-2xl font-bold mb-4">Welcome, {{ state?.user?.firstName }}!</h1>
        <p class="text-gray-600 mb-6">Manage your profile and generate your email signature below:</p>
        <h2 class="text-lg font-semibold mb-2">Signature Preview</h2>
        <SignatureComponent :signature="state.signature" />

        <div v-if="state.loading" class="mt-6 text-blue-500 font-semibold">Generating your signature...</div>
        <div v-if="state.errorMessage" class="mt-6 text-red-500 font-semibold">{{ state.errorMessage }}</div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import store from "store";
import { API_URL } from "@/constants/environments";
import axios from "axios";
import SignatureComponent from "./SignatureComponent.vue";
const state = reactive({
    user: null,
    token: null,
    signature: null,
    loading: false,
    errorMessage: ""
});

const generateSignature = async () => {
    state.loading = true;
    state.errorMessage = "";

    try {
        const response = await axios.get(
            `${API_URL}/users/${state.user.id}/signature`,
            { headers: { Authorization: `Bearer ${state.token}` } }
        );
        state.signature = response.data?.data?.signature || "";
    } catch (error) {
        state.errorMessage = error.message;
    } finally {
        state.loading = false;
    }
};

const loadUserFromLocalStorage = () => {
    const storedUser = store.get("user");
    const storedToken = store.get("token");
    if (storedUser && storedToken) {
        state.user = storedUser;
        state.token = storedToken;
    }
};

onMounted(() => {
    loadUserFromLocalStorage();
    generateSignature();
});
</script>
