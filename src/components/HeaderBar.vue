<template>
  <header class="flex flex-wrap items-center justify-space-between py-3 mb-4 border-b">
    <div class="md:flex-1">
      <a href="/" class="text-xl font-bold">pintravel</a>
    </div>

    <div class="flex-grow flex justify-center items-center">
      <form class="flex">
        <div class="relative"> <!-- relative 위치 추가 -->
          <input ref="tagInput" type="text" :placeholder="placeholder" class="border rounded p-1 w-full" />
        </div>
        <button class="bg-blue-500 text-white rounded p-1 ml-2" @click.prevent="search">검색</button>
      </form>
    </div>

    <div class="md:flex-1 text-end">
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
import { useUserStore } from "@/stores/user.js";
import { storeToRefs } from "pinia";

const router = useRouter();


const tagInput = ref(null);
const inputValue = ref("");
const tags = ref([]);
const selectedTags = ref([]);
const placeholder = ref("태그 검색");


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
  router.push({ name: 'search', query: { tags: queryTags } });
};

const handleInput = async (input) => {
  // tags.value = await selectTagByInput(input);
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
/* 추가적인 스타일링이 필요하면 여기에 작성 */
</style>