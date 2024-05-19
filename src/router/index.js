import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import DetailView from "@/views/DetailView.vue";
import SearchView from "@/views/SearchView.vue";
import UserInfoView from "@/views/UserInfoView.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";
import SignUpView from "@/views/SignUpView.vue";
import CreateView from "@/views/CreateView.vue";
import TestView from "@/views/TestView.vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css"; // for React, Vue and Svelte
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { keepAlive: true },
    },
    {
      path: "/pin/:id",
      name: "pin-detail",
      component: DetailView,
      meta: { keepAlive: true },
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
      meta: { keepAlive: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { keepAlive: true },
      afterEnter: (to, from, next) => {
        const notyf = new Notyf();
        notyf.success("login success");
      },
    },
    {
      path: "/signUp",
      name: "sign-up",
      component: SignUpView,
    },
    {
      path: "/mypage",
      name: "mypage",
      component: UserInfoView,
    },
    {
      path: "/board/:id",
      name: "board-detail",
      component: BoardDetail,
    },
    {
      path: "/create",
      name: "create",
      component: CreateView,
      beforeEnter: (to, from, next) => {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) {
          const notyf = new Notyf();
          notyf.error("You must be logged in to access this page.");
          next("/login");
        } else {
          next();
        }
      },
    },
    {
      path: "/test",
      name: "test",
      component: TestView,
    },
  ],
});

export default router;
