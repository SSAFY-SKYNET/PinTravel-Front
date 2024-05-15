<template>
  <div @click="handleClick">
    <img :src="item.imageUrl" class="rounded-lg" />
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
