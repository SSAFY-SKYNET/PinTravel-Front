<template>
  <div>
    <!-- 로그인 처리 중 표시할 메시지 또는 로더 -->
    <p>로그인 처리 중입니다. 잠시만 기다려주세요...</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

onMounted(() => {
  // URL 쿼리에서 토큰 추출 및 디코딩
  const accessToken = decodeURIComponent(route.query.accessToken);
  const refreshToken = decodeURIComponent(route.query.refreshToken);

  if (accessToken && refreshToken) {
    // 세션 스토리지에 토큰 저장
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);

    // 홈 페이지로 리디렉션
    router.push("/");
  } else {
    // 토큰이 없는 경우 로그인 페이지로 리디렉션
    router.push("/login");
  }
});
</script>
