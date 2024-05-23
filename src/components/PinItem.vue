<template>
  <div class="relative group overflow-hidden rounded-lg cursor-pointer h-full w-full" @click="handleClick">
    <div v-if="loading" role="status" class="flex justify-center items-center h-full">
      <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor" />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill" />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
    <img :src="item.imageUrl" @load="loading = false"
      class="rounded-lg h-48 w-full aspect-w-1 aspect-h-1 object-cover group-hover:brightness-90 transition-all"
      v-show="!loading" />
    <div
      class="absolute inset-0 bg-black/50 group-hover:opacity-100 opacity-0 transition-opacity flex items-center justify-center">
      <div class="flex items-center gap-2 text-white">
        <button v-if="!boardId" aria-label="Like pin"
          class="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          @click.stop.prevent="likePin">
          <svg :class="{ 'fill-current text-red-500': item.isPinned }" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="w-6 h-6">
            <path
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
        <button v-else aria-label="Delete pin"
          class="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          @click.stop.prevent="deletePin">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { useRouter } from 'vue-router';
import { Notyf } from "notyf";
import iziToast from "izitoast";
import { deletePinBoard } from "@/api/pinBoard.js";
import { deleteLike } from "@/api/like.js";

const router = useRouter();
const props = defineProps({
  item: Object,
  boardId: [Number, null], // Allow boardId to be either null or an integer
});

const emit = defineEmits(["click"]);
const loading = ref(true);

const handleClick = (event) => {
  event.stopPropagation();
  emit("click", props.item);
};

const likePin = (event) => {
  event.stopPropagation();
  event.preventDefault();
  const token = sessionStorage.getItem('accessToken');
  if (!token) {
    iziToast.warning({
      title: 'Caution',
      timeout: 5000,
      message: '좋아요는 로그인 후 이용해주세요.',
    });
    router.push('/login');
  } else {
    router.push({
      name: 'board-create',
      params: { id: props.item.pinId },
    });
  }
};

const deletePin = (event) => {
  event.stopPropagation();
  event.preventDefault();
  const token = sessionStorage.getItem('accessToken');
  if (!token) {
    const notyf = new Notyf();
    notyf.error("login plz");
    router.push('/login');
  } else {
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
      message: '정말로 보드에서 핀을 삭제하시겠습니까?',
      position: 'center',
      buttons: [
        ['<button><b>DELETE</b></button>', async function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          await handleDeletePin();
        }, true],
        ['<button>Cancel</button>', function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }]
      ]
    });
  }
}

const handleDeletePin = async () => {
  const token = sessionStorage.getItem('accessToken');

  await deletePinBoard(props.item.pinId, props.boardId, token);
  await deleteLike(props.item.pinId);
};
</script>
