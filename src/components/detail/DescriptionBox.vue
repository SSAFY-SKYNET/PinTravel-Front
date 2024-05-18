<template>
  <div class="description-box">
    <h1>{{ title }}</h1>
    <hr />
    <br />
    <p>{{ address }}</p>
    <hr />
    <br />
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  title: String,
  description: String,
  address: String,
});
</script>

<style scoped>
.description-box {
  padding: 1rem;
}
</style>
