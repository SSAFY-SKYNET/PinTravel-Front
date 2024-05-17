<template>
  <div @click="handleClick" class="cursor-pointer h-full w-full">
    <img :src="pin.imageUrl" class="rounded-lg h-full w-full object-cover" />
  </div>
</template>

<script setup>

import { defineProps, defineEmits } from "vue";

const props = defineProps({
  pin: Object,
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click", props.pin);
};


</script>