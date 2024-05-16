<template>
  <header
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
      <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
        <use xlink:href="#bootstrap"></use>
      </svg>
      Pintravel
    </a>

    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
      <li><a href="#" class="nav-link px-2 link-secondary">Home</a></li>
      <li><a href="#" class="nav-link px-2 link-dark">Features</a></li>
      <li><a href="#" class="nav-link px-2 link-dark">Pricing</a></li>
      <li><a href="#" class="nav-link px-2 link-dark">FAQs</a></li>
      <li><a href="#" class="nav-link px-2 link-dark">About</a></li>
    </ul>
    <!-- <input type="search" class="form-control" placeholder="Search..."> -->

    <div class="col-md-4 text-end" v-if="!isLogin">
      <button type="button" class="btn btn-outline-primary me-2" @click="login">Login</button>
      <button type="button" class="btn btn-primary">Sign-up</button>
    </div>
    <div class="col-md-4 text-end" v-else>
      <button type="button" class="btn btn-primary me-2">MyPage</button>
      <button type="button" class="btn btn-outline-primary " @click="logout">Logout</button>
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
