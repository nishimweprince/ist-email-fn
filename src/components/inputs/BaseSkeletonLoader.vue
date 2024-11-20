<template>
    <figure
      :class="`animate-pulse bg-gray-200 rounded-[4px]`"
      :style="skeletonStyle"
    />
  </template>
  
  <script lang="ts">
  export default {
    name: 'BaseSkeletonLoader',
    props: {
      type: {
        type: String,
        default: 'text',
        validator(value: string) {
          return ['text', 'avatar', 'button', 'card', 'table', 'input'].includes(value);
        }
      },
      width: {
        type: String,
        default: ''
      },
      height: {
        type: String,
        default: ''
      }
    },
    computed: {
      skeletonStyle() {
        const width = this.width || (this.type === 'text' ? `${Math.random() * (70 - 50) + 50}%` : '100%');
        const height = this.height || (this.type === 'input' ? '2.3rem' : '1.75rem');
        
        return {
          width,
          height,
          animationDuration: '1.4s'
        };
      }
    }
  }
  </script>
