<template>
  <header class="flex flex-wrap items-center justify-between py-3 mb-4 border-b">
    <div class="md:flex-1">
      <a href="/" class="text-xl font-bold">pintravel</a>
    </div>
    <div class="md:flex-1">
      <input type="text" placeholder="검색" class="border rounded p-1" />
      <button class="bg-blue-500 text-white rounded p-1">검색</button>
    </div>
    <div class="md:flex-1 text-right">
      <button v-if="!isLoggedIn" @click="login" class="bg-blue-500 text-white rounded p-1">
        로그인
      </button>
      <div v-else>
        <button @click="logout" class="bg-red-500 text-white rounded p-1">
          로그아웃
        </button>
        <button class="bg-green-500 text-white rounded p-1">프로필</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = true;
const login = () => {
  router.push("/login");
};
</script>

<style>
/* 추가적인 스타일링이 필요하면 여기에 작성 */
</style>
