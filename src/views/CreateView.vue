<template>
  <div class="create-form p-4 max-w-lg mx-auto shadow-lg rounded-lg">
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="photo" class="block text-sm font-medium text-gray-700"
        >사진:</label
        >
        <input
            type="file"
            id="photo"
            ref="photoInput"
            accept="image/*"
            @change="previewImage"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <!-- 이미지 미리보기 -->
        <div v-if="imagePreview" class="mt-4">
          <img
              :src="imagePreview"
              alt="Photo Preview"
              class="max-w-xs rounded-lg shadow-sm"
          />
        </div>
      </div>
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700"
        >제목:</label
        >
        <input
            type="text"
            id="title"
            v-model="title"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label for="address" class="block text-sm font-medium text-gray-700"
        >주소:</label
        >
        <input
            type="text"
            id="address"
            v-model="address"
            @click="showModal = true"
            readonly
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div
            v-if="showModal"
            class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            id="my-modal"
            @click="closeModal"
        >
          <div
              class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
              @click.stop
          >
            <!-- 이 div 태그에서의 클릭 이벤트가 상위로 전파되지 않도록 .stop 수식어 사용 -->
            <div class="mt-3 text-center">
              <div
                  class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
              >
                <!-- 아이콘 또는 로고 -->
              </div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                주소 검색
              </h3>
              <div class="mt-2 px-7 py-3">
                <VueDaumPostcode
                    @complete="handleAddress"
                    @close="showModal = false"
                />
              </div>
              <div class="items-center px-4 py-3">
                <button
                    id="ok-btn"
                    @click="showModal = false"
                    class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  완료
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700"
        >설명:</label
        >
        <textarea
            id="description"
            v-model="description"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>
      <div>
        <label for="tags" class="block text-sm font-medium text-gray-700"
        >태그:</label
        >
        <input
            type="text"
            id="tags"
            v-model="tags"
            placeholder="태그를 쉼표로 구분하세요"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        제출
      </button>
    </form>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {Notyf} from "notyf";
import {useRouter} from "vue-router";
import heic2any from "heic2any";
import exifr from "exifr";
import {VueDaumPostcode} from "vue-daum-postcode";
import {createPin, uploadImage} from "@/api/pin";
import iziToast from "izitoast";

const notyf = new Notyf();
const router = useRouter();

const photoInput = ref(null);
const title = ref("");
const description = ref("");
const tags = ref("");
const imagePreview = ref(null);
const showModal = ref(false);
const address = ref("");

const latitude = ref(127.0);
const longitude = ref(37.0);

const handleAddress = (data) => {
  address.value = data.address;
  showModal.value = false;
  console.log("Address data", data);
};

const closeModal = () => {
  showModal.value = false;
};

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

const submitForm = async () => {
  let errorMessage = "";
  if (!photoInput.value.files[0]) {
    errorMessage += "사진, ";
  }
  if (!title.value.trim()) {
    errorMessage += "제목, ";
  }
  if (!description.value.trim()) {
    errorMessage += "설명, ";
  }
  if (!tags.value.trim()) {
    errorMessage += "태그, ";
  }
  if (errorMessage.length > 0) {
    errorMessage = errorMessage.slice(0, -2) + " 필드를 채워주세요.";
    notyf.error(errorMessage);
    return;
  }

  let photo = photoInput.value.files[0];
  photo = await getHeicToJpeg(photo);
  console.log("이미지 등록 중...");

  uploadAndCreatePin(photo, {
    title: title.value.trim(),
    description: description.value.trim(),
    address: address.value,
    latitude: latitude.value,
    longitude: longitude.value,
  });
};
const uploadAndCreatePin = async (photo, pinDetails) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      console.error("접근 토큰이 없습니다.");
      return;
    }

    const imageUrl = await uploadImage(photo, token);
    if (!imageUrl) {
      console.error("이미지 업로드 실패");
      return;
    }

    const pinData = {
      title: pinDetails.title.trim(),
      description: pinDetails.description.trim(),
      imageUrl: imageUrl,
      address: pinDetails.address,
      latitude: pinDetails.latitude,
      longitude: pinDetails.longitude,
    };
    console.log("pinData", pinData);
    const response = await createPin(pinData, token);
    iziToast.success({
      title: "성공",
      message: "핀이 성공적으로 추가되었습니다.",
      position: "topRight",
      timeout: 3000
    });
    router.push({path: `/mypage`, query: {activeTab: 'pin'}});
  } catch (error) {
    console.error("핀 생성 오류", error);
    iziToast.error({
      title: "실패",
      message: "보드 생성 또는 핀 추가 중 오류가 발생했습니다.",
      position: "topRight",
      timeout: 3000
    });
    router.push({path: `/`});
  }
};
// 이미지 파일을 읽고 미리보기를 업데이트하는 함수
const previewImage = async () => {
  let file = photoInput.value.files[0];
  const originalMetadata = await exifr.parse(file); // 원본 파일의 메타데이터 추출
  console.log("originalMetadata", originalMetadata);

  if (originalMetadata.GPSLongitude && originalMetadata.GPSLatitude) {
    latitude.value = parseFloat(
        originalMetadata.GPSLatitude[0] +
        "." +
        originalMetadata.GPSLatitude[1] +
        "" +
        originalMetadata.GPSLatitude[2].toString().replace(".", "")
    );
    longitude.value = parseFloat(
        originalMetadata.GPSLongitude[0] +
        "." +
        originalMetadata.GPSLongitude[1] +
        "" +
        originalMetadata.GPSLongitude[2].toString().replace(".", "")
    );
    console.log("latitude", latitude.value);
    console.log("longitude", longitude.value);
  }

  file = await getHeicToJpeg(file);

  if (file) {
    Object.assign(file, originalMetadata); // 변환된 파일에 원본 메타데이터 복제
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>
<style scoped>
.create-form {
  position: relative;
}

.create-form .vue-daum-postcode {
  position: absolute;
  top: 100%; /* 입력 필드 바로 아래에 위치 */
  left: 0;
  width: 100%; /* 부모 컨테이너의 전체 너비 */
  z-index: 10; /* 다른 요소들 위에 표시 */
  border: 1px solid #ccc; /* 경계선 추가 */
  background-color: white; /* 배경색 설정 */
}
</style>
