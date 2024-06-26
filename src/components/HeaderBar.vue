<template>
  <header class="flex flex-wrap items-center justify-space-between py-3 mb-4 border-b">
    <div class="md:flex-1 ml-20"> <!-- ml-5 클래스 추가 -->
      <a href="/" class="text-xl font-bold">pintravel</a>
    </div>

    <div class="flex-grow flex justify-center items-center">
      <form class="flex w-full max-w-md">
        <div class="relative flex-grow">
          <input ref="tagInput" type="text" :placeholder="placeholder" class="border rounded-l p-1 w-full"/>
        </div>
        <button class="bg-blue-500 text-white rounded-r p-1 px-4" @click.prevent="search">검색</button>
      </form>
    </div>

    <div class="md:flex-1 text-end mr-20"> <!-- mr-5 클래스 추가 -->
      <div v-if="!isLogin">
        <button type="button" class="btn btn-outline-primary me-2" @click="login">Login</button>
        <button type="button" class="btn btn-primary" @click="signUp">Sign-up</button>
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
import { ref, onMounted } from "vue";
import { selectTagByInput } from "../api/tag";
import Tagify from '@yaireo/tagify';
import {useUserStore} from "@/stores/user.js";
import {storeToRefs} from "pinia";
import iziToast from "izitoast";

const router = useRouter();

const tagInput = ref(null);
const inputValue = ref("");
const tags = ref([]);
const selectedTags = ref([]);
const placeholder = ref("Tag Search");

const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore);
const { userLogout } = userStore

const checkLoginStatus = () => {
  const token = sessionStorage.getItem('accessToken');
  isLogin.value = !!token;
};

const logout = async () => {
  await userLogout();
  isLogin.value = false;
  router.push('/');
};

onMounted(() => {
  checkLoginStatus();
  const tagify = new Tagify(tagInput.value, {
    whitelist: tags.value,
    dropdown: {
      maxItems: 6,
      classname: "tags-look",
      enabled: 0,
      closeOnSelect: false
    }
  });

  tagify.on('input', async e => {
    inputValue.value = e.detail.value;
    tags.value = await selectTagByInput(inputValue.value);
    tagify.settings.whitelist = tags.value.map(tag => tag.name);
    tagify.dropdown.show.call(tagify, inputValue.value);
  });

  tagify.on('add', e => {
    selectedTags.value.push(e.detail.data.value);
  });

  tagify.on('remove', e => {
    selectedTags.value = selectedTags.value.filter(tag => tag !== e.detail.data.value);
  });
});

const search = () => {
  const queryTags = selectedTags.value.join(',');
  if (queryTags.length === 0) {
    iziToast.info({
      title: "No search keywords",
      message: "Please enter search keywords.",
      position: "bottomRight",
      timeout: 3000,
    });
  } else {
    router.push({name: 'search', query: {tags: queryTags}});
  }
};

const login = () => {
  router.push("/login");
};

const mypage = () => {
  router.push('/mypage');
}

const signUp = () => {
  router.push('/signUp')
}
</script>

<style>
.search-bar {
  width: 150%; /* 검색바 크기를 1.5배로 늘림 */
}
</style>