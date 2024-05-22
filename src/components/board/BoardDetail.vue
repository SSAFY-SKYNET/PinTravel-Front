<template>
  <section class="bg-white dark:bg-gray-950 py-8 md:py-12">
    <div class="container mx-auto px-4 md:px-6">
      <div v-if="item && items.length > 0" class="w-full p-2 flex flex-row h-[400px] mb-6 md:mb-8">
        <div class="w-1/2 border border-gray-200 rounded-lg p-4 overflow-y-auto">
          <ul class="space-y-2">
            <li v-for="pin in items" :key="pin.pinId" class="cursor-pointer hover:bg-gray-100 rounded-md">
              <router-link :to="`/pin/${pin.pinId}`" class="block px-4 py-2">
                {{ pin.title }}
              </router-link>
            </li>
          </ul>
        </div>
        <MapDisplay
            class="w-1/2 border border-gray-200 rounded-lg p-4"
            :pins="items"
        />
      </div>
      <div v-if="item && !isModify" class="mb-6 md:mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl md:text-3xl font-bold">{{ item.title }}</h2>
          <svg
              v-if="item.private"
              class="w-4 h-4 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-base md:text-lg">{{ item.description }}</p>
      </div>
      <!-- ... -->
      <div v-if="!isModify" class="flex justify-end space-x-4 mb-6 md:mb-8">
        <button
            @click="makeTravelPlan"
            class="px-4 py-2 border border-green-500 rounded-md text-green-500 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Make Plan
        </button>
        <button
            @click="startModify"
            class="px-4 py-2 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Edit Board
        </button>
        <button
            @click="deleteButton"
            class="px-4 py-2 border border-red-500 rounded-md text-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete Board
        </button>
      </div>
    </div>
    <div v-if="isPlan">
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div v-html="planData" class="text-gray-700"></div>
      </div>
    </div>
    <div ref="scrollContainer" class="h-[calc(100vh)] overflow-y-auto flex justify-center main">
      <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-cols-max gap-4 mx-auto">
        <PinItemList :items="items" :board-id="route.params.id"/>
        <div ref="observerElement" style="height: 1px"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {getBoardDetailById, updateBoard, deleteBoard} from "@/api/board.js";
import PinItemList from "@/components/PinItemList.vue";
import {getPinByBoardAndPage} from "@/api/pin.js";
import MapDisplay from "@/components/detail/MapDisplay.vue";
import iziToast from "izitoast";

import OpenAI from 'openai'
import {generateTravelPlan} from "@/api/openAi.js";

const item = ref(null);
const route = useRoute();

const items = ref([]);
const page = ref(1);
const limit = 30;
const scrollContainer = ref(null);
const observerElement = ref(null);

let observer;

const isModify = ref(false);
const modifiedItem = ref({});

const isPlan = ref(false)
const planData = ref('')

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

const startModify = () => {
  isModify.value = true;
  modifiedItem.value = {...item.value};
};

const cancelModify = () => {
  isModify.value = false;
  modifiedItem.value = {};
};

const submitForm = async () => {
  try {
    const boardData = {
      title: modifiedItem.value.title,
      description: modifiedItem.value.description,
      private: modifiedItem.value.private,
    };
    await updateBoard(route.params.id, boardData);
    item.value = {...modifiedItem.value};
    isModify.value = false;
    modifiedItem.value = {};
  } catch (error) {
    console.error("Failed to update board:", error);
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

const deleteButton = () => {
  iziToast.question({
    timeout: 20000,
    close: false,
    overlayClose: true,
    overlay: true,
    color: 'red',
    displayMode: 'once',
    id: 'question',
    zindex: 999,
    title: 'Hey',
    message: '정말로 이 게시판을 삭제하시겠습니까?',
    position: 'center',
    buttons: [
      ['<button><b>DELETE</b></button>', async function (instance, toast) {
        instance.hide({transitionOut: 'fadeOut'}, toast, 'button');
        await handleDeleteBoard();
      }, true],
      ['<button>Cancel</button>', function (instance, toast) {
        instance.hide({transitionOut: 'fadeOut'}, toast, 'button');
      }]
    ]
  });
}

const handleDeleteBoard = async () => {
  await deleteBoard(route.params.id);
};

const makeTravelPlan = async () => {
  isPlan.value = !isPlan.value;

  try {
    const plan = await generateTravelPlan(items.value);
    planData.value = plan;  } catch (error) {
    console.error('Failed to generate travel plan', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to generate travel plan. Please try again later.',
      position: 'topRight',
      timeout: 5000,
    });
  }
};
</script>

<style scoped></style>