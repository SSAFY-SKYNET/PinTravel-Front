<template>
  <header class="flex flex-wrap items-center justify-between py-3 mb-4 border-b">
    <div class="md:flex-1">
      <a href="/" class="text-xl font-bold">pintravel</a>
    </div>
    <form class="max-w-sm mx-auto">
      <select id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

        <option value="tags">tags</option>
      </select>
    </form>
    <form class="max-w-sm mx-auto">
      <select id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

        <option value="like">like</option>
        <option value="location">location</option>
        <option value="comment">comment</option>
      </select>
    </form>
    <div class="md:flex-1 flex">
      <!-- 입력 필드와 검색 버튼을 flex 컨테이너로 감싸기 -->
      <div class="flex-grow relative"> <!-- relative 위치 추가 -->
        <input type="text" placeholder="검색" class="border rounded p-1 w-full" v-model="input"
          @input="handleInput($event)" />
        <!-- 태그 제안 드롭다운 -->
        <div v-if="tags.length > 0" class="absolute bg-white border mt-1 w-full">
          <ul>
            <li v-for="tag in tags" :key="tag.id" @click="selectTag(tag)">
              {{ tag.name }}
            </li>
          </ul>
        </div>
      </div>
      <button class="bg-blue-500 text-white rounded p-1 ml-2">검색</button>
    </div>
    <div class="col-md-4 text-end" v-if="!isLogin">
      <button type="button" class="btn btn-outline-primary me-2" @click="login">Login</button>
      <button type="button" class="btn btn-primary">Sign-up</button>
    </div>
    <div class="col-md-4 text-end" v-else>
      <button type="button" class="btn btn-primary me-2" @click="mypage">MyPage</button>
      <button type="button" class="btn btn-outline-primary " @click="logout">Logout</button>
    </div>

  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { selectTagByInput } from "../api/tag";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const router = useRouter();

const input = ref(null);
const isLoggedIn = true;
const tags = ref([]);

const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore);
const { userLogout } = userStore

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

const handleInput = async (event) => {
  const currentValue = event.target.value;
  tags.value = await selectTagByInput(currentValue);
};

const selectTag = (tag) => {
  input.value = tag.name; // 선택된 태그를 입력 필드에 설정
  tags.value = []; // 드롭다운 목록을 비움
};

const login = () => {
  router.push("/login");
};

const logout = async () => {
  await userLogout();
  router.push('/');
};

const mypage = () => {
  router.push('/mypage');
}
</script>

<style>
/* 추가적인 스타일링이 필요하면 여기에 작성 */
</style>