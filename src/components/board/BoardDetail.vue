<template>
  <section class="bg-white dark:bg-gray-950 py-8 md:py-12">
    <div class="container mx-auto px-4 md:px-6">
      <div v-if="item && items.length > 0" class="w-full p-2 flex flex-row h-[400px] mb-6 md:mb-8">
        <div class="w-1/2 border p-2 overflow-y-auto">
          <ul>
            <li v-for="pin in items" :key="pin.pinId" class="cursor-pointer">
              <router-link :to="`/pin/${pin.pinId}`">
                {{ pin.title }}
              </router-link>
            </li>
          </ul>
        </div>
        <MapDisplay
            class="w-1/2 border p-2"
            :pins="items"
        />
      </div>
      <div v-if="item" class="mb-6 md:mb-8">
        <h2 class="text-2xl md:text-3xl font-bold mb-2">{{ item.title }}</h2>
        <p class="text-gray-500 dark:text-gray-400 text-base md:text-lg">{{ item.description }}</p>
      </div>
      <div class="flex justify-end mb-6 md:mb-8">
        <button
            class="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
          Edit Board
        </button>
        <button
            class="px-4 py-2 border border-red-500 rounded-md text-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-200">
          Delete Board
        </button>
      </div>
      <div ref="scrollContainer" class="h-[calc(100vh-200px)] overflow-y-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <PinItemList :items="items"/>
          <div ref="observerElement" style="height: 1px"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {getBoardDetailById} from "@/api/board.js";
import PinItemList from "@/components/PinItemList.vue";
import {getPinByBoardAndPage} from "@/api/pin.js";
import MapDisplay from "@/components/detail/MapDisplay.vue";

const item = ref(null);
const route = useRoute();

const items = ref([]);
const page = ref(1);
const limit = 30;
const scrollContainer = ref(null);
const observerElement = ref(null);

let observer;

const loadData = async () => {
  if (route.params.id) {
    try {
      const res = await getBoardDetailById(route.params.id);
      item.value = res;
    } catch (error) {
      console.error("Failed to fetch board details:", error);
    }
  }
};

const loadItems = async () => {
  try {
    const newItems = await getPinByBoardAndPage(route.params.id, page.value, limit);
    items.value.push(...newItems);
    page.value++;
  } catch (error) {
    console.error("Failed to fetch pins:", error);
  }
};

onMounted(() => {
  console.log("boardDetail on Mount!");
  loadData();

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