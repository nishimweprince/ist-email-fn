<script setup lang="ts">
import { defineProps, computed, type PropType } from 'vue';
import { RouterLink } from 'vue-router';
import BaseLoader from './BaseLoader.vue';

const props = defineProps({
    type: {
        type: String as PropType<'button' | 'submit' | 'reset'>,
        default: 'button',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    class: {
        type: String,
        default: '',
    },
    onClick: {
        type: Function,
        required: false,
    },
    variant: {
        type: String,
        default: 'primary',
    },
    to: {
        type: String,
        required: false,
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
});

const buttonClasses = computed(() => {
    const base = 'py-2 px-4 rounded-md focus:outline-none transition-all text-[14px] ease-in-out duration-150';
    const variants: Record<string, string> = {
        primary: 'bg-primary text-white hover:bg-primary/80',
        secondary: 'bg-secondary text-white hover:bg-secondary/80',
        danger: 'bg-red-600 text-white hover:bg-red-600/80',
        disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
        outline: 'bg-none text-primary border-primary hover:bg-none border-none hover:underline',
        submit: 'bg-primary text-white hover:bg-primary/80',
    };
    return `${base} ${variants[props.variant] || variants.primary} ${props.class}`;
});
</script>

<template>
    <RouterLink v-if="to" :to="to" :type="type" :disabled="disabled" :class="buttonClasses" @click="(e: MouseEvent) => onClick?.(e)">
        <slot />
    </RouterLink>
    <button v-else :type="type" :disabled="disabled" :class="buttonClasses" @click="(e: MouseEvent) => onClick?.(e)">
        <slot />
    </button>
    <BaseLoader v-if="isLoading" />
</template>
