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
      <div v-if="item && !isModify" class="mb-6 md:mb-8 flex justify-between items-center">
        <h2 class="text-2xl md:text-3xl font-bold">{{ item.title }}</h2>
        <svg
            v-if="item.private"
            class="w-4 h-4"
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
      <div v-else-if="isModify" class="mb-6 md:mb-8">
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="title" class="block font-medium text-gray-700">Title</label>
            <input
                type="text"
                id="title"
                v-model="modifiedItem.title"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block font-medium text-gray-700">Description</label>
            <textarea
                id="description"
                v-model="modifiedItem.description"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="private" class="inline-flex items-center">
              <input
                  type="checkbox"
                  id="private"
                  v-model="modifiedItem.private"
                  class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span class="ml-2 text-gray-700">Private</span>
            </label>
          </div>
          <div class="flex justify-end">
            <button
                type="submit"
                class="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
            <button
                type="button"
                @click="cancelModify"
                class="ml-4 px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <p v-if="item && !isModify" class="text-gray-500 dark:text-gray-400 text-base md:text-lg mb-6 md:mb-8">{{
          item.description
        }}</p>
      <div v-if="!isModify" class="flex justify-end mb-6 md:mb-8">
        <button
            @click="startModify"
            class="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          Edit Board
        </button>
        <button
            @click="deleteButton"
            class="px-4 py-2 border border-red-500 rounded-md text-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-200"
        >
          Delete Board
        </button>
      </div>
      <div ref="scrollContainer" class="h-[calc(100vh-200px)] overflow-y-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <PinItemList :items="items" :board-id="route.params.id"/>
          <div ref="observerElement" style="height: 1px"></div>
        </div>
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
import router from "@/router/index.js";
import {deleteLike} from "@/api/like.js";

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
</script>

<style scoped></style>