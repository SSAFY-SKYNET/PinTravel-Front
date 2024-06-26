<template>
  <div class="flex flex-col place-items-center">
    <div
      class="container flex flex-col bg-white p-6 rounded-lg shadow-lg relative m-4 h-auto w-auto overflow-auto"
    >
      <div v-if="userInfo" class="flex flex-col gap-6">
        <div v-if="!isModify" class="flex items-center gap-6">
          <UserImgDisplay
            class="w-100 h-100 rounded-full"
            :imageUrl="userInfo.profilePicture"
          />
          <div class="text-left">
            <p class="text-2xl font-medium">{{ userInfo.username }}</p>
            <p class="text-sm text-gray-500">{{ userInfo.email }}</p>
            <!--
                        <div class="mt-2 flex items-center gap-4">
                          <div>
                            <p class="font-medium">팔로워</p>
                            <p class="text-sm text-gray-500">{{ userInfo.followers }}</p>
                          </div>
                          <div>
                            <p class="font-medium">팔로잉</p>
                            <p class="text-sm text-gray-500">{{ userInfo.following }}</p>
                          </div>
                        </div>
            -->
            <button
              class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              @click="isModify = !isModify"
            >
              정보수정
            </button>
          </div>
        </div>
        <div v-else>
          <form @submit.prevent="submitForm" class="flex items-center gap-6">
            <div class="relative">
              <img
                :src="previewImage || userInfo.profilePicture"
                class="w-100 h-100 rounded-full"
                alt="Profile Picture"
              />
              <input
                type="file"
                class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                @change="handleFileChange"
              />
            </div>
            <div class="flex flex-col gap-2 w-full max-w-xs">
              <input
                type="text"
                v-model="modify.username"
                class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="사용자 이름"
              />
              <input
                placeholder="새 비밀번호를 입력하세요"
                type="password"
                v-model="modify.password"
                class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div class="flex justify-start gap-2 mt-4">
                <button
                  type="submit"
                  class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  정보수정
                </button>
                <button
                  type="button"
                  class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                  @click="cancelModify"
                >
                  취소
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="flex justify-center space-x-4 my-4">
      <button
        class="px-4 py-2 rounded-lg"
        :class="{
          'bg-blue-500 text-white': activeTab === 'pin',
          'bg-gray-200': activeTab !== 'pin',
        }"
        @click="setActiveTab('pin')"
      >
        핀
      </button>
      <button
        class="px-4 py-2 rounded-lg"
        :class="{
          'bg-blue-500 text-white': activeTab === 'board',
          'bg-gray-200': activeTab !== 'board',
        }"
        @click="setActiveTab('board')"
      >
        보드
      </button>
    </div>

    <div
      v-show="activeTab === 'pin'"
      ref="pinScrollContainer"
      class="h-[calc(100vh-400px)] w-full overflow-y-auto flex justify-center pin-main"
    >
      <div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-cols-max gap-4 mx-auto"
        >
          <div
            v-for="item in pins"
            :key="item.pinId"
            class="w-[90vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] xl:w-[18vw]"
          >
            <router-link :to="`/pin/${item.pinId}`">
              <PinItem :item="item" />
            </router-link>
          </div>
          <div ref="pinObserverElement" style="height: 1px"></div>
        </div>
      </div>
    </div>

    <div
      v-show="activeTab === 'board'"
      ref="boardScrollContainer"
      class="h-[calc(100vh-400px)] w-full overflow-y-auto flex justify-center board-main"
    >
      <div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-cols-max gap-4 mx-auto"
        >
          <div
            v-for="board in boards"
            :key="board.boardId"
            class="w-[90vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] xl:w-[18vw]"
          >
            <router-link :to="`/board/${board.boardId}`">
              <BoardItem :item="board" />
            </router-link>
          </div>
          <div ref="boardObserverElement" style="height: 1px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import UserImgDisplay from "@/components/user/UserImgDisplay.vue";
import { getBoardByUserId } from "@/api/board.js";
import BoardItem from "@/components/board/BoardItem.vue";
import { getPinByUserId, uploadImage } from "@/api/pin.js";
import PinItem from "@/components/PinItem.vue";
import heic2any from "heic2any";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { getUserInfo, userModify } = userStore;

const activeTab = ref("pin");

const setActiveTab = (tab) => {
  activeTab.value = tab;
  router.push({ query: { activeTab: tab } });
};

const isModify = ref(false);
const modify = ref({
  userId: "",
  username: "",
  password: "",
  profilePicture: null,
});

const getHeicToJpeg = async (file) => {
  if (file.type === "" || file.type === "image/heic") {
    const jpegBlob = await heic2any({
      blob: file,
      toType: "image/jpeg",
    });
    const name = file.name.split(".")[0] + ".jpeg";
    return new File([jpegBlob], name);
  }
  return file;
};

const previewImage = ref(null);

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const convertedFile = await getHeicToJpeg(file);
    modify.value.profilePicture = convertedFile;
    previewImage.value = URL.createObjectURL(convertedFile);
  }
};

const submitForm = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) {
    console.error("접근 토큰이 없습니다.");
    return;
  }

  let errorMessage = "";
  if (!modify.value.username.trim()) {
    errorMessage += "사용자 이름, ";
  }
  if (errorMessage.length > 0) {
    errorMessage = errorMessage.slice(0, -2) + " 필드를 채워주세요.";
    alert(errorMessage);
    return;
  }

  const imageUrl = await uploadImage(modify.value.profilePicture, token);
  if (!imageUrl) {
    console.error("이미지 업로드 실패");
    return;
  }

  const formData = new FormData();
  formData.append("username", modify.value.username.trim());
  if (modify.value.password.trim()) {
    formData.append("password", modify.value.password.trim());
  }
  if (modify.value.profilePicture) {
    formData.append("profilePicture", imageUrl);
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      console.error("접근 토큰이 없습니다.");
      return;
    }

    await userModify(formData, token);
    await initializeUserInfo();

    alert("사용자 정보가 성공적으로 수정되었습니다.");
    isModify.value = false;
  } catch (error) {
    console.error("사용자 정보 수정 오류", error);
    alert("사용자 정보 수정 중 오류가 발생했습니다.");
  }
};

const cancelModify = () => {
  isModify.value = false;
  modify.value = {
    userId: "",
    username: "",
    password: "",
    profilePicture: null,
  };
  previewImage.value = null;
};

// 새로고침 시 토큰 유효성 확인 및 userInfo 불러오기
const initializeUserInfo = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUserInfo) {
      userInfo.value = storedUserInfo;
    } else {
      await getUserInfo(token);
      modify.value.userId = userInfo.value.userId;
      modify.value.username = userInfo.value.username;
      modify.value.profilePicture = userInfo.value.profilePicture;
    }
  }
};

const boards = ref([]);
const boardPage = ref(1);
const boardLimit = 30;
const boardScrollContainer = ref(null);
const boardObserverElement = ref(null);

let boardObserver;

const getBoardList = async () => {
  if (userInfo.value && userInfo.value.userId) {
    const newItems = await getBoardByUserId(
      userInfo.value.userId,
      boardPage.value,
      boardLimit
    );
    console.log(newItems);
    boards.value.push(...newItems);
    boardPage.value++;
  }
};

const pins = ref([]);
const pinPage = ref(1);
const pinLimit = 30;
const pinScrollContainer = ref(null);
const pinObserverElement = ref(null);

let pinObserver;

const loadPins = async () => {
  if (userInfo.value && userInfo.value.userId) {
    const newPins = await getPinByUserId(
      userInfo.value.userId,
      pinPage.value,
      pinLimit
    );
    pins.value.push(...newPins);
    pinPage.value++;
  }
};

onMounted(async () => {
  await initializeUserInfo();

  const tab = route.query.activeTab;
  if (tab === "board") {
    activeTab.value = "board";
  } else if (tab === "pin") {
    activeTab.value = "pin";
  }

  await nextTick(async () => {
    // Pin IntersectionObserver 설정
    pinObserver = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          console.log("Loading more pins...");
          await loadPins();
        }
      },
      {
        root: pinScrollContainer.value,
      }
    );

    // pinObserverElement 관찰 시작
    if (pinObserverElement.value) {
      pinObserver.observe(pinObserverElement.value);
    }

    // Board IntersectionObserver 설정
    boardObserver = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          console.log("Loading more boards...");
          await getBoardList();
        }
      },
      {
        root: boardScrollContainer.value,
      }
    );

    // boardObserverElement 관찰 시작
    if (boardObserverElement.value) {
      boardObserver.observe(boardObserverElement.value);
    }
  });
});
</script>

<style lang="css" scoped>
body {
  background-color: #f5f5f5;
  overflow-y: visible;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

/* 스크롤바의 폭 너비 */
.pin-main::-webkit-scrollbar,
.board-main::-webkit-scrollbar {
  width: 5px;
}

.pin-main::-webkit-scrollbar-thumb,
.board-main::-webkit-scrollbar-thumb {
  background: rgb(87, 87, 87);
  /* 스크롤바 색상 */
  border-radius: 10px;
  /* 스크롤바 둥근 테두리 */
}

.pin-main::-webkit-scrollbar-track,
.board-main::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
  /* 스크롤바 뒷 배경 색상 */
}
</style>
