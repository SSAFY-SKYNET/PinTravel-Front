<template>
  <div class="container mx-auto mt-20">
    <div class="flex justify-center">
      <div class="w-full max-w-md">
        <form class="p-8 border rounded-lg bg-gray-100">
          <div class="mb-6">
            <input type="text"
                   class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                   id="username" placeholder="사용자 이름"
                   v-model="user.username">
            <label for="username" class="text-gray-700">사용자 이름</label>
          </div>
          <div class="mb-6">
            <input type="email"
                   class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                   id="email" placeholder="name@example.com"
                   v-model="user.email">
            <label for="email" class="text-gray-700">이메일 주소</label>
          </div>
          <div class="mb-6">
            <input type="password"
                   class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                   id="password" placeholder="비밀번호"
                   v-model="user.password">
            <label for="password" class="text-gray-700">비밀번호</label>
          </div>
          <div class="mb-6">
            <input type="file"
                   class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                   id="profilePicture" placeholder="프로필 사진"
                   @change="onFileChange">
            <label for="profilePicture" class="text-gray-700">프로필 사진</label>
          </div>
          <div class="mb-6 text-start" v-if="isSignupError">
            <div class="alert alert-danger" role="alert">회원가입에 실패했습니다. 다시 시도해주세요.</div>
          </div>
          <button
              class="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              type="submit" @click.prevent="submitForm">회원가입
          </button>
          <hr class="my-4">
          <small class="text-muted">이미 계정이 있으신가요?
            <button @click="goToLogin">로그인하기</button>
          </small>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
import {useUserStore} from "@/stores/user.js";
import {ref} from 'vue';
import {storeToRefs} from "pinia";

const router = useRouter();
const userStore = useUserStore();
const {isSignupError} = storeToRefs(userStore);
const {userSignUp} = userStore;

const user = ref({
  username: '',
  email: '',
  password: '',
  profilePicture: null
});

const onFileChange = (event) => {
  user.value.profilePicture = event.target.files[0];
};

const submitForm = async () => {
  const formData = new FormData();
  formData.append('username', user.value.username);
  formData.append('email', user.value.email);
  formData.append('password', user.value.password);

  if (user.value.profilePicture) {
    formData.append('profilePicture', user.value.profilePicture);
  }

  await userSignUp(formData);

  if (!isSignupError.value) {
    router.push("/login");
  }
};

const goToLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
/* Tailwind CSS를 사용하여 스타일을 적용하세요. */
</style>