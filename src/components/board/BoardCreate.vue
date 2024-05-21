<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto py-12 md:py-24 px-4 md:px-6">
    <div class="flex items-center justify-center">
      <img
          v-if="item"
          :src="item.imageUrl"
          alt="Image"
          class="rounded-xl"
          style="aspect-ratio: 500/500; object-fit: cover; width: 500px; height: 500px;"
      />
    </div>
    <div class="flex flex-col items-start justify-center">
      <div class="space-y-3">
        <h2 class="text-3xl font-bold">Add Pin to Board</h2>
        <p class="text-gray-500">Select a board to add the pin to, or create a new board.</p>
      </div>
      <form class="w-full space-y-4 mt-6" @submit.prevent="submitForm">
        <div class="space-y-2">
          <label for="board" class="block font-medium text-gray-700">Select Board</label>
          <select id="board" v-model="selectedBoard"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="">Select a board</option>
            <option v-for="board in boards" :key="board.boardId" :value="board.boardId">{{ board.title }}</option>
            <option value="create">Create new board</option>
          </select>
        </div>
        <div v-if="selectedBoard === 'create'">
          <div class="space-y-2">
            <label for="title" class="block font-medium text-gray-700">Title</label>
            <input
                id="title"
                v-model="title"
                type="text"
                placeholder="Enter the board title"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="space-y-2">
            <label for="description" class="block font-medium text-gray-700">Description</label>
            <textarea
                id="description"
                v-model="description"
                placeholder="Enter the board description"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
            ></textarea>
          </div>
          <div class="flex items-center space-x-2">
            <input type="checkbox" id="private" v-model="isPrivate" class="form-checkbox h-5 w-5 text-blue-500"/>
            <svg
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
            <label for="private" class="block font-medium text-gray-700">Private</label>
          </div>
        </div>
        <button
            type="submit"
            class="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {{ selectedBoard === 'create' ? 'Create Board and Add Pin' : 'Add Pin to Board' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {createBoard} from "@/api/board.js";
import {addPinBoard} from "@/api/pinBoard.js";
import {getBoardListByUserId} from "@/api/board.js";
import {getPinDetailById} from "@/api/pin.js";
import router from "@/router/index.js";
import iziToast from "izitoast";
import {addLike} from "@/api/like.js";

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const item = ref(null);

const title = ref("");
const description = ref("");
const isPrivate = ref(false);
const selectedBoard = ref("");

const boards = ref([]);

onMounted(async () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) {
    console.error("접근 토큰이 없습니다.");
    return;
  }

  try {
    const fetchedItem = await getPinDetailById(props.id);
    item.value = fetchedItem;

    const fetchedBoards = await getBoardListByUserId(token);
    boards.value = fetchedBoards;
  } catch (error) {
    console.error("데이터 가져오기 오류:", error);
  }
});

const submitForm = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) {
    console.error("접근 토큰이 없습니다.");
    return;
  }

  try {
    if (selectedBoard.value === "create") {
      const formData = {
        thumbnail: item.value.imageUrl,
        title: title.value,
        description: description.value,
        private: isPrivate.value
      };

      const boardId = await createBoard(formData, token);
      await addPinBoard(item.value.pinId, boardId, token);
      iziToast.success({
        title: "성공",
        message: "보드가 성공적으로 생성되었고, 핀이 추가되었습니다.",
        position: "topRight",
        timeout: 3000
      });
      await addLike(item.value.pinId, token)
      router.push({path: `/mypage`, query: {activeTab: 'board'}});
    } else {
      await addPinBoard(item.value.pinId, selectedBoard.value, token);
      iziToast.success({
        title: "성공",
        message: "핀이 성공적으로 보드에 추가되었습니다.",
        position: "topRight",
        timeout: 3000
      });
      await addLike(item.value.pinId, token)
      router.push({path: `/mypage`, query: {activeTab: 'board'}});
    }
  } catch (error) {
    console.error("오류 발생:", error);
    iziToast.error({
      title: "실패",
      message: "보드 생성 또는 핀 추가 중 오류가 발생했습니다.",
      position: "topRight",
      timeout: 3000
    });
    router.push({path: `/`});
  }
};
</script>