<template>
  <div class="flex h-screen justify-center items-center w-full p-6">
    <div class="grid h-full w-full grid-cols-6 gap-3 fa animate-fadein">
      <div class="row-span-2 bg-red-600 common-style" @click="homepage">
        home
      </div>
      <div class="bg-green-600 common-style" @click="about">about</div>
      <div class="bg-blue-600 common-style" @click="create">create</div>
      <div class="col-span-2 bg-yellow-600 common-style">
        <SearchBento />
      </div>
      <div class="bg-purple-600 common-style">userInfo</div>
      <div class="bg-orange-600 common-style">popular</div>
      <div class="col-span-2 bg-red-600 common-style">login</div>
      <div class="col-span-2 row-span-2 bg-green-600 common-style">
        <MapBento />
      </div>
      <div class="col-span-2 bg-yellow-500 common-style">11</div>
      <div class="bg-purple-500 common-style">12</div>
      <div class="bg-pink-500 common-style">13</div>
    </div>
  </div>
</template>

<script setup>
import SearchBento from "@/components/SearchBento.vue";
import MapBento from "@/components/MapBento.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const homepage = () => {
  router.push("/magazine");
};

const about = () => {
  router.push("/about");
};

const create = () => {
  router.push("/create");
};
</script>
