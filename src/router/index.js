import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import DetailView from "@/views/DetailView.vue";
import SearchView from "@/views/SearchView.vue";
import UserInfoView from "@/views/UserInfoView.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";
import SignUpView from "@/views/SignUpView.vue";
import CreateView from "@/views/CreateView.vue";
import TestView from "@/views/TestView.vue";
import {Notyf} from "notyf";
import "notyf/notyf.min.css";
import BoardCreate from "@/components/board/BoardCreate.vue";
import iziToast from "izitoast"; // for React, Vue and Svelte

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: {keepAlive: true},
        },
        {
            path: "/pin/:id",
            name: "pin-detail",
            component: DetailView,
            meta: {keepAlive: true},
        },
        {
            path: "/search",
            name: "search",
            component: SearchView,
            meta: {keepAlive: true},
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
            meta: {keepAlive: true},
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
            beforeEnter: (to, from, next) => {
                const accessToken = sessionStorage.getItem("accessToken");
                if (!accessToken) {
                    iziToast.warning({
                        title: 'Caution',
                        timeout: 5000,
                        message: '마이페이지는 로그인 후 이용해주세요.',
                    });
                    next("/login");
                } else {
                    next();
                }
            },
        },
        {
            path: "/board/create/:id",
            name: "board-create",
            component: BoardCreate,
            props: true,
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
                    iziToast.warning({
                        title: 'Caution',
                        timeout: 5000,
                        message: '핀 등록은 로그인 후 이용해주세요.',
                    });
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
