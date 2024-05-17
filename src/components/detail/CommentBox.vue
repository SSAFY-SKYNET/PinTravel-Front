<template>
  <div class="comment-box bg-white shadow-md rounded-lg p-4">
    <div class="input-container flex items-center border-b border-gray-300 pb-4 mb-4">
      <input v-model="newComment" placeholder="댓글을 입력하세요" class="border p-2 flex-grow rounded-md"
        @keydown.enter="addComment" />
      <button @click.prevent="addComment" class="add-comment-btn ml-2">
        <svg class="h-6 w-6 text-gray-600 hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
    </div>
    <ul class="comment-list space-y-2 w-full">
      <li v-for="comment in comments" :key="comment.id" class="bg-gray-100 rounded-md p-2 shadow-sm flex space-x-4">
        <div>{{ comment.text }}</div>
        <div>{{ comment.createdAt }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getCommentByPinId, insertComment } from "@/api/comment";
import { useRoute } from "vue-router";

const route = useRoute();

const comments = ref([]);

const newComment = ref("");

const addComment = async () => {
  const commentText = newComment.value; // 댓글 내용을 변수에 저장
  newComment.value = ""; // 입력 필드 초기화

  comments.value = await insertComment({
    pinId: route.params.id,
    userId: 1, // 임시로 유저 Id 생성
    text: commentText // 저장된 댓글 내용을 사용
  })
}


onMounted(async () => {
  comments.value = await getCommentByPinId(route.params.id)
})

</script>

<style scoped>
.comment-box {
  margin-top: 1rem;
}

.input-container {
  display: flex;
  align-items: center;
}

.add-comment-btn {
  padding: 0.5rem;
  margin-left: 0.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.comment-list {
  max-height: 300px;
  /* 최대 높이 설정 */
  overflow-y: auto;
  /* 내용이 넘칠 경우 스크롤바 표시 */
}
</style>
