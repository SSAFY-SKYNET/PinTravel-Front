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
div {
  width: 200px; /* 원하는 너비 값으로 변경 */
  height: auto; /* 비율 유지를 위해 auto로 설정 */
}
</style>