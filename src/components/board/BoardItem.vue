<template>
  <div class="container">
    <div @click="handleClick" class="card">
      <img :src="item.thumbnail" alt="Card Image" class="card-image">
      <div class="card-content">
        <div class="card-header">
          <h3>{{ item.title }}</h3>
          <svg
              v-if="item.private"
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>