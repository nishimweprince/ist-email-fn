<template>
    <div v-if="props.signature" class="mt-8 bg-gray-100 p-4 rounded-md shadow-lg text-left">
      <h2 class="text-lg font-semibold mb-2">Signature Preview</h2>
      <div v-html="props.signature" class="text-gray-800"></div>
      <div class="flex gap-2 mt-4">
        <BaseButton
          class="bg-primary hover:bg-primary/80 text-white py-2 px-4 text-sm rounded-lg shadow-md transition flex items-center gap-2"
          @click="copyAndUpdate"
        >
          <span>Copy & Update Signature</span>
        </BaseButton>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import BaseButton from '@/components/inputs/BaseButton.vue';
  
  const props = defineProps<{
    signature: string
  }>();
  
  const emit = defineEmits(['error']);
  
  const OUTLOOK_SIGNATURE_URL = 'https://outlook.office.com/mail/options/accounts-category/signatures-subcategory';
  
  const copyAndUpdate = async () => {
    if (props.signature) {
      try {
        // Copy to clipboard
        await navigator.clipboard.writeText(props.signature);
        
        // Open Outlook signatures page in new tab
        window.open(OUTLOOK_SIGNATURE_URL, '_blank');
        
        emit('error', 'Signature copied! Opening Outlook signatures page...');
      } catch (error) {
        emit('error', error.message);
      }
    }
};
</script>
