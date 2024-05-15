import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import router from "./router";
import "./assets/index.css";

import { useKakao } from "vue3-kakao-maps/@utils";

const app = createApp(App);
useKakao("99fc72f6b7787160e7e76150caeb56fa");

app.use(createPinia());
app.use(router);

app.mount("#app");
