<template>
  <div class="container flex flex-col bg-white p-4 rounded-lg shadow-lg relative m-4 h-auto w-full overflow-auto">
    <div v-if="item" class="w-full p-2 flex flex-row h-[50%]">
      <div class="w-1/2 border p-2">
        <img :src="item.thumbnail" alt="Board Thumbnail" class="w-full h-auto">
      </div>
      <div class="w-1/2 border p-2">
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getBoardDetailById } from "@/api/board.js";

const item = ref(null);
const route = useRoute();

const loadData = async () => {
  if (route.params.id) {
    try {
      const res = await getBoardDetailById(route.params.id);
      item.value = res;
    } catch (error) {
      console.error("Failed to fetch board details:", error);
    }
  }
};

onMounted(() => {
  console.log("boardDetail on Mount!");
  loadData();
});
</script>

<style scoped></style>