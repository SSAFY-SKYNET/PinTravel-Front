<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form class="p-4 p-md-5 border rounded-3 bg-light">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                   v-model="user.email">
            <label for="floatingInput">이메일 주소</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                   v-model="user.password">
            <label for="floatingPassword">비밀번호</label>
          </div>
          <div class="mb-3 text-start" v-if="isLoginError === true">
            <div class="alert alert-danger" role="alert">아이디 또는 비밀번호 확인해 주세요</div>
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit" @click.prevent="submitForm">로그인</button>
          <hr class="my-4">
          <small class="text-muted">계정이 없으신가요? 지금 가입하세요.</small>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from "@/stores/user.js";
import { ref } from 'vue';
import { storeToRefs } from "pinia";

const router = useRouter();
const userStore = useUserStore();
const { isLoginError, userInfo } = storeToRefs(userStore);
const { userLogin, getUserInfo } = userStore;

const user = ref({
  email: '',
  password: ''
});

const submitForm = async () => {
  await userLogin(user.value);
  const token = sessionStorage.getItem("accessToken");

  if (token) {
    console.log("사용자 정보:", userInfo.value);
    router.push("/");
  }
};
</script>

<style scoped>
/* 여기에 필요한 스타일을 추가하세요. */
</style>
