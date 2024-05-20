<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto py-12 md:py-24 px-4 md:px-6">
    <div class="flex items-center justify-center">
      <img
          :src="item.imageUrl"
          alt="Image"
          class="rounded-xl"
          style="aspect-ratio: 500/500; object-fit: cover; width: 500px; height: 500px;"
      />
    </div>
    <div class="flex flex-col items-start justify-center">
      <div class="space-y-3">
        <h2 class="text-3xl font-bold">Create Board</h2>
        <p class="text-gray-500">Fill out the form below to create a new board.</p>
      </div>
      <form class="w-full space-y-4 mt-6" @submit.prevent="submitForm">
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
        <button
            type="submit"
            class="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Board
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";
import {createBoard} from "@/api/board.js";
import {addPinBoard} from "@/api/pinBoard.js";

const route = useRoute();
const item = ref(JSON.parse(route.query.item || null));

const title = ref("");
const description = ref("");
const isPrivate = ref(false)

const submitForm = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) {
    console.error("접근 토큰이 없습니다.");
    return;
  }

  const formData = {
    thumbnail: item.value.imageUrl,
    title: title.value,
    description: description.value,
    private: isPrivate.value
  };

  try {
    const boardId = await createBoard(formData, token);
    await addPinBoard(item.value.pinId, boardId, token);
    alert("보드가 성공적으로 생성되었습니다.");
    // 추가적인 동작 수행 (예: 생성된 보드 페이지로 이동)
  } catch (error) {
    console.error("오류 발생:", error);
    alert("보드 생성 중 오류가 발생했습니다.");
  }
};
</script>