<template>
  <div @click="handleClick" class="cursor-pointer h-full w-full">
    <img :src="item.imageUrl" class="rounded-lg h-full w-full object-cover" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  item: Object,
});
const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click", props.item);
};
</script>
