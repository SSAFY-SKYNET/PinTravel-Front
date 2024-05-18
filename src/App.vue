<template>
  <HeaderBar @search="handleSearch" />
  <RouterView :key="$route.path" :searchTags="searchTags" />
  <FooterBar />
</template>

<script setup>
import HeaderBar from "./components/HeaderBar.vue";
import FooterBar from "./components/FooterBar.vue";
import { ref } from "vue";

const searchTags = ref([]);

const handleSearch = async (tags) => {
  searchTags.value = tags;
  console.log(searchTags.value);
};
</script>

<style lang="css">
body {
  overflow-y: hidden;
} /* 스크롤바의 폭 너비 */
.main::-webkit-scrollbar {
  width: 5px;
}

.main::-webkit-scrollbar-thumb {
  background: rgb(87, 87, 87);
  /* 스크롤바 색상 */
  border-radius: 10px;
  /* 스크롤바 둥근 테두리 */
}

.main::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
  /* 스크롤바 뒷 배경 색상 */
}
</style>
