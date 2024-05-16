<template>
  <div class="container flex flex-col bg-white p-4 rounded-lg shadow-lg relative m-4 h-auto w-full overflow-auto">
    <div v-if="dataLoaded" class="w-full p-2 flex flex-row h-[50%]">
      <PhotoDisplay class="w-1/2 border p-2" :imageUrl="item.imageUrl" />
      <MapDisplay class="w-1/2 border p-2" :latitude="item.latitude" :longitude="item.longitude" />
    </div>
    <div v-if="dataLoaded" class="col-span-2 grid grid-rows-3 gap-4">
      <DescriptionBox class="row-span-2" :title="item.title" :description="item.description" />
      <button @click="toggleComments" class="p-2 bg-blue-500 text-white rounded">{{ showComments ? '숨기기' : '댓글 보기'
        }}</button>
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