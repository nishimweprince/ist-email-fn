<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  ariaLabel: {
    type: String,
    default: '',
  },
  onChange: {
    type: Function,
    required: false,
  },
});
defineEmits(['update:modelValue']);

const { value, errorMessage, handleChange } = useField(props.name);

const handleInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  handleChange(e);
  if (props.onChange) {
    props.onChange(target.value);
  }
};
</script>

<template>
  <fieldset class="flex flex-col gap-2">
    <label class="w-full flex flex-col gap-2">
      <span class="text-primary text-sm font-medium">{{ label }}</span>
      <input
        :type="type"
        :name="name"
        :aria-label="ariaLabel || label"
        :placeholder="placeholder"
        :value="value"
        class="py-2 px-4 w-full rounded-lg border-[1.5px] border-secondary border-opacity-50 outline-none focus:outline-none focus:border-[1.6px] focus:border-primary ease-in-out duration-50 text-sm placeholder:font-light"
        @input="handleInputChange"
      />
      <span v-if="errorMessage" class="text-red-500 text-[13px]">{{ errorMessage }}</span>
    </label>
  </fieldset>
</template>
