<template>
  <div class="comment-box">
    <div class="input-container flex items-center">
      <input
        v-model="newComment"
        placeholder="댓글을 입력하세요"
        class="border p-2 flex-grow"
        @keydown.enter="addComment"
      />
      <button @click="addComment" class="add-comment-btn">
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
      </button>
    </div>
    <ul class="comment-list">
      <li v-for="comment in comments" :key="comment.id">{{ comment.text }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  comments: Array,
});

const newComment = ref("");

function addComment() {
  if (newComment.value.trim()) {
    props.comments.push({
      id: props.comments.length + 1,
      text: newComment.value,
    });
    newComment.value = ""; // 입력 필드 초기화
  }
}
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
  overflow-y: auto;
}
</style>
