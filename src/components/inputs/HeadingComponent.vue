<script setup lang="ts">
defineProps<{
    label: string;
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}>()
</script>

<template>
    <h1 class="text-primary text-2xl font-semibold uppercase">{{ label }}</h1>
</template>