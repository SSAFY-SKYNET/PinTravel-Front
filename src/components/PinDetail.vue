<template>
  <div class="container flex flex-col bg-white p-4 rounded-lg shadow-lg relative m-4 h-auto w-full overflow-auto">
    <div v-if="dataLoaded" class="w-full p-2 flex flex-row h-[50%]">
      <PhotoDisplay class="w-1/2 border p-2" :imageUrl="item.imageUrl" />
      <MapDisplay class="w-1/2 border p-2" :latitude="item.latitude" :longitude="item.longitude" />
    </div>
    <div v-if="dataLoaded" class="col-span-2 grid grid-rows-3 gap-4">
      <DescriptionBox class="row-span-2" :title="item.title" :description="item.description" />
      <div class="flex justify-center">
        <div v-if="!showComments">
          <svg @click="toggleComments" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"></path>
          </svg>
        </div>
        <div v-else>
          <svg @click="toggleComments" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"></path>
          </svg>
        </div>
      </div>
      <CommentBox v-if="showComments" :comments="item.comments" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import PhotoDisplay from "./detail/PhotoDisplay.vue";
import MapDisplay from "./detail/MapDisplay.vue";
import DescriptionBox from "./detail/DescriptionBox.vue";
import CommentBox from "./detail/CommentBox.vue";
import { getPinDetailById } from "../api/pin";

const item = ref({});
const route = useRoute();
const dataLoaded = ref(false);
const showComments = ref(false);

const loadData = async () => {
  if (route.params.id) {
    try {
      const res = await getPinDetailById(route.params.id);
      item.value = res;
      dataLoaded.value = true;
    } catch (error) {
      console.error("Failed to fetch pin details:", error);
    }
  }
};

const toggleComments = () => {
  showComments.value = !showComments.value;
};

onMounted(() => {
  console.log("detailview on Mount@!");
  loadData();
});
</script>

<style scoped></style>