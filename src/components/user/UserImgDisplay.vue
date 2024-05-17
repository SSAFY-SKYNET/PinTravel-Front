<template>
  <div>
    <img :src="imageUrl" alt="User Image" class="w-full h-full object-cover rounded-full">
  </div>
</template>

<script setup>
const props = defineProps({
  imageUrl: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
/* 추가적인 스타일링이 필요하면 여기에 작성 */
</style>