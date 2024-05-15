<template>
  <div
    class="container flex flex-col bg-white p-4 rounded-lg shadow-lg relative m-4 h-auto w-full"
  >
    <div v-if="dataLoaded" class="w-full p-2 flex flex-row h-[50%]">
      <PhotoDisplay class="w-1/2 border p-2" :imageUrl="item.imageUrl" />
      <MapDisplay
        class="w-1/2 border p-2"
        :latitude="item.latitude"
        :longitude="item.longitude"
      />
    </div>
    <div v-if="dataLoaded" class="w-full p-2 flex flex-col h-[50%]">
      <DescriptionBox :title="item.title" :description="item.description" />
      <CommentBox :comments="item.comments" />
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
const showMore = ref(false);

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

onMounted(() => {
  loadData();
});
</script>

<style scoped></style>
