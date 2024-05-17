import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import DetailView from "@/views/DetailView.vue";
import SearchView from "@/views/SearchView.vue";
import UserInfoView from "@/views/UserInfoView.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";


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
    }, {
      path: "/mypage",
      name: "mypage",
      component: UserInfoView,
    },
    {
      path: "/board/:id",
      name: "board-detail",
      component: BoardDetail,
    }
  ]
});

export default router;