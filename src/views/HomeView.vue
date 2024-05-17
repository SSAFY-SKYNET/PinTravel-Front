<template>
  <div ref="scrollContainer" class="h-[calc(100vh)] overflow-y-auto flex justify-center main">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-cols-max gap-4 mx-auto">
      <PinItemList :items="items" />
      <div ref="observerElement" style="height: 1px"></div>
    </div>
  </div>
</template>

<script setup>

import PinItemList from "@/components/PinItemList.vue";

import { ref, onMounted } from "vue";

import { getPinByPage } from "@/api/pin.js";


const items = ref([]);
const page = ref(1);
const limit = 30;
const scrollContainer = ref(null);
const observerElement = ref(null);

let observer;

const loadItems = async () => {
  const newItems = await getPinByPage(page.value, limit);
  items.value.push(...newItems);
  page.value++;
};

onMounted(async () => {
  observer = new IntersectionObserver(
    async (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        await loadItems();
      }
    },
    {
      root: scrollContainer.value,
    }
  );
  observer.observe(observerElement.value);
});

</script>

<style scoped></style>
