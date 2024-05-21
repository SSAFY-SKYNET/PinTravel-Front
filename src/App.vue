<template>
  <HeaderBar @search="handleSearch" />
  <RouterView :key="$route.path" :searchTags="searchTags" />
  <FooterBar />
</template>

<script setup>
import HeaderBar from "./components/HeaderBar.vue";
import FooterBar from "./components/FooterBar.vue";
import { ref, onMounted, onUpdated } from "vue";
import { useUserStore } from "@/stores/user.js";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const searchTags = ref([]);
const { isLogin } = storeToRefs(userStore);

const handleSearch = async (tags) => {
  searchTags.value = tags;
  console.log(searchTags.value);
};

const checkLoginStatus = () => {
  const token = sessionStorage.getItem("accessToken");
  isLogin.value = !!token;
};

onMounted(() => {
  checkLoginStatus();
});
onUpdated(() => {
  checkLoginStatus();
});
</script>

<style lang="css">
/* 스크롤바의 폭 너비 */
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
