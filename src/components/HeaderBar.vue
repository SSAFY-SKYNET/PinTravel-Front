<template>
  <header class="flex flex-wrap items-center justify-space-between py-3 mb-4 border-b">
    <div class="md:flex-1">
      <a href="/" class="text-xl font-bold">pintravel</a>
    </div>

    <div class="flex-grow flex justify-center items-center">
      <form class="flex">
        <div class="relative"> <!-- relative 위치 추가 -->
          <input ref="tagInput" type="text" :placeholder="placeholder" class="border rounded p-1 w-full"
            @input="handleInput($event)" />

          <!-- <div v-if="tags.length > 0" class="absolute bg-white border mt-1 w-full">
            <ul>
              <li v-for="tag in tags" :key="tag.id" @click="selectTag(tag)">
                {{ tag.name }}
              </li>
            </ul>
          </div> -->
        </div>
        <button class="bg-blue-500 text-white rounded p-1 ml-2" @click.prevent="search">검색</button>
      </form>
    </div>

    <div class="md:flex-1 text-end">
      <div v-if="!isLogin">
        <button type="button" class="btn btn-outline-primary me-2" @click="login">Login</button>
        <button type="button" class="btn btn-primary">Sign-up</button>
      </div>
      <div v-else>
        <button type="button" class="btn btn-primary me-2" @click="mypage">MyPage</button>
        <button type="button" class="btn btn-outline-primary " @click="logout">Logout</button>
      </div>
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
import Tagify from '@yaireo/tagify';

const router = useRouter();

const tagInput = ref(null);
const inputValue = ref(""); // 입력값을 저장할 반응형 참조

const tags = ref([]);
const placeholder = ref("태그 검색");

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
  const tagify = new Tagify(tagInput.value, {
    whitelist: tags.value, // 초기 화이트리스트 설정
    dropdown: {
      maxItems: 6,
      classname: "tags-look",
      enabled: 0,
      closeOnSelect: false
    }
  });

  // Tagify의 input 이벤트 리스너 설정
  tagify.on('input', async e => {
    inputValue.value = e.detail.value; // 입력값 업데이트
    tags.value = await selectTagByInput(inputValue.value); // API 호출을 통해 태그 데이터 가져오기
    tagify.settings.whitelist = tags.value.map(tag => tag.name); // 화이트리스트 업데이트
    tagify.dropdown.show.call(tagify, inputValue.value); // 드롭다운 갱신
    console.log("현재 입력값:", inputValue.value);
    console.log("tags.value : ", tags.value);
    tags.value = []
  });
});

const handleInput = async (input) => {
  tags.value = await selectTagByInput(input);
  console.log("tags.value : ", tags.value)
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