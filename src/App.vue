<template>
  <HeaderBar />
  <RouterView :key="$route.fullPath" />
</template>

<script setup>
import HeaderBar from "./components/HeaderBar.vue";
</script>
<RouterView :key="$route.fullPath" />

<style lang="css">
body {
  overflow-y: hidden;
}
</style>
