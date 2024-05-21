import {createApp} from "vue";
import {createPinia} from "pinia";
import App from "./App.vue";

import router from "./router";
import "./assets/index.css";

import {useKakao} from "vue3-kakao-maps";
import "@yaireo/tagify/dist/tagify.css";
import "notyf/notyf.min.css"; // Notyf 스타일 시트
import "exifr";
import "heic2any";
import "izitoast/dist/css/iziToast.css";
import VueDaumPostcode from "vue-daum-postcode";

const app = createApp(App);

useKakao("99fc72f6b7787160e7e76150caeb56fa", ["services"]);

app.use(createPinia());
app.use(router);
app.use(VueDaumPostcode); // export default is plugin

app.mount("#app");
