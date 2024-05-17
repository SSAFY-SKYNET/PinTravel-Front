<template>
  <div class="container">
    <div @click="handleClick" class="card">
      <img :src="item.thumbnail" alt="Card Image" class="card-image">
      <div class="card-content">
        <h3>{{ item.title }}</h3>
        <hr>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";

const props = defineProps({
  item: Object,
});
const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click", props.item);
};
</script>

<style lang="css" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card {
  width: 240px;
  margin: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.card-content {
  padding: 15px;
}
</style>