<template>
  <div class="photo-display">
    <img v-if="imageLoaded" :src="imageUrl" alt="Photo" class="photo h-full w-full object-contain"
      @load="imageLoaded = true" />
    <div v-else class="loading-image">
      <div class="loading-image-text">
        로딩 중...
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const imageLoaded = ref(true);

defineProps({
  imageUrl: String,
});

</script>