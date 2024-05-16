<template>
  <header class="flex flex-wrap items-center justify-between py-3 mb-4 border-b">
    <div class="md:flex-1">
      <a href="/" class="text-xl font-bold">pintravel</a>
    </div>
    <div class="md:flex-1">
      <input type="text" placeholder="검색" class="border rounded p-1"/>
      <button class="bg-blue-500 text-white rounded p-1">검색</button>
    </div>
    <div class="md:flex-1 text-right">
      <div class="col-md-4 text-end" v-if="!isLogin">
        <button type="button" class="btn btn-outline-primary me-2" @click="login">Login</button>
        <button type="button" class="btn btn-primary">Sign-up</button>
      </div>
      <div class="col-md-4 text-end" v-else>
        <button type="button" class="btn btn-primary me-2">MyPage</button>
        <button type="button" class="btn btn-outline-primary " @click="logout">Logout</button>
      </div>
    </div>

  </header>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user.js";
import {onMounted} from "vue";

const router = useRouter()

const userStore = useUserStore()
const {isLogin} = storeToRefs(userStore);
const {userLogout} = userStore

const checkLoginStatus = () => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    userStore.isLogin = true;
  } else {
    userStore.isLogin = false;
  }
};

onMounted(() => {
  checkLoginStatus()
})

const login = () => {
  router.push('/login')
}
const logout = async () => {
  await userLogout();
  router.push('/');
};
</script>

<style scoped>
/* 필요한 스타일은 여기에 추가하세요. */
</style>
