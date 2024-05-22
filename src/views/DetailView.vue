<template>
  <div
    ref="scrollContainer"
    class="flex flex-col items-center main h-[100vh] overflow-y-auto"
  >
    <div class="flex flex-col items-center">
      <PinDetail class="mb-4 w-full h-[calc(80vh)]" />
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-cols-max gap-4 mx-auto"
    >
      <PinItemList :items="items" />
      <div ref="observerElement" class="h-1"></div>
    </div>
  </div>
</template>
<script setup>
import PinItemList from "@/components/PinItemList.vue";
import PinDetail from "@/components/PinDetail.vue";

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getPinsByPinIdAndPage } from "@/api/pin.js";

const route = useRoute();
const items = ref([]);
const page = ref(1);
const limit = 10;
const scrollContainer = ref(null);
const observerElement = ref(null);
const pinId = route.params.id;
let observer;

const loadItems = async () => {
  console.log(pinId, page.value, limit);
  const newItems = await getPinsByPinIdAndPage(pinId, page.value, limit);
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
