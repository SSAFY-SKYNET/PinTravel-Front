<template>
  <HeaderBar />
  <!-- <KeepAlive> -->
    <RouterView :key="$route.path" />
  <!-- </KeepAlive> -->
</template>

<script setup>
import HeaderBar from "./components/HeaderBar.vue";
</script>

<style lang="css">
body {
  overflow-y: hidden;
}

.masonry {
  display: flex;
  margin-left: -16px;
  /* gutter size */
  width: auto;
}

.masonry-column {
  padding-left: 16px;
  /* gutter size */
  background-clip: padding-box;
}

.masonry-item {
  margin-bottom: 16px;
  /* gutter size */
}
</style>
