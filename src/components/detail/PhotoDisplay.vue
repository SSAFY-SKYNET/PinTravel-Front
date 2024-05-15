<template>
  <div class="photo-display">
    <img
      :src="imageUrl"
      alt="Photo"
      class="photo h-full w-full object-contain"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  imageUrl: String,
});
</script>
