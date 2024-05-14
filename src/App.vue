<<<<<<< Updated upstream
<script setup></script>

<template>
  <RouterView />
</template>

<style>
.common-style {
  @apply p-4 text-white rounded-lg hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer flex justify-center items-center;
}
</style>
=======
<template>
  <HeaderBar />
  <RouterView />
</template>

<script setup>
import HeaderBar from './components/HeaderBar.vue';
</script>

<style lang="scss" scoped></style>
>>>>>>> Stashed changes
