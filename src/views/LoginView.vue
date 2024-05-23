<template>
  <div class="container mx-auto mt-20">
    <div class="flex justify-center">
      <div class="w-full max-w-md">
        <form class="p-8 border rounded-lg bg-gray-100">
          <div class="mb-6">
            <input type="email"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="floatingInput" placeholder="email@example.com" v-model="user.email" />
            <label for="floatingInput" class="text-gray-700">이메일 주소</label>
          </div>
          <div class="mb-6">
            <input type="password"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="floatingPassword" placeholder="Password" v-model="user.password" />
            <label for="floatingPassword" class="text-gray-700">비밀번호</label>
          </div>
          <div class="mb-6 text-start" v-if="isLoginError === true">
            <div class="alert alert-danger" role="alert">
              아이디 또는 비밀번호 확인해 주세요
            </div>
          </div>
          <button
            class="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            type="submit" @click.prevent="submitForm">
            로그인
          </button>
          <!-- ouath-login -->
          <div class="flex justify-center mt-6">
            <a :href="`${API_URL}/oauth2/authorization/google?prompt=select_account`" class="google-login-button">
              <div class="google-icon-wrapper">
                <img class="google-icon" src="../assets/web_light_sq_SI.svg" alt="Google logo" />
              </div>
            </a>
          </div>

          <hr class="my-4" />
          <small class="text-muted">계정이 없으신가요?
            <button @click="goToSignUp">회원가입하기</button>
          </small>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import iziToast from "izitoast";
const API_URL = import.meta.env.VITE_API_URL;

const router = useRouter();
const userStore = useUserStore();
const { isLoginError, userInfo } = storeToRefs(userStore);
const { userLogin } = userStore;

const user = ref({
  email: "",
  password: "",
});

const submitForm = async () => {
  if (!user.value.email || !user.value.password) {
    iziToast.error({
      title: '오류',
      message: '이메일과 비밀번호를 입력해주세요.',
      position: 'bottomRight',
      timeout: 3000,
    });
    return;
  }

  await userLogin(user.value);
  const token = sessionStorage.getItem('accessToken');

  if (token) {
    console.log('사용자 정보:', userInfo.value);
    router.push('/');
  } else {
    iziToast.error({
      title: '오류',
      message: '아이디 또는 비밀번호를 확인해주세요.',
      position: 'bottomRight',
      timeout: 3000,
    });
  }
};

const goToSignUp = () => {
  router.push("/signup");
};
</script>

<style scoped>
/* Tailwind CSS를 사용하여 스타일을 적용하세요. */
</style>
@/store/user.js@/store/user.js
