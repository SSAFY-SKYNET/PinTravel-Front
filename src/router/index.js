import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import PinDetail from "@/components/PinDetail.vue";
import UserInfoView from "@/views/UserInfoView.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: {keepAlive: true},
            children: [
                {
                    path: "pin/:id",
                    name: "pin-detail",
                    component: PinDetail,
                },
            ],
        },

        {
            path: "/login",
            name: "login",
            component: LoginView,
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
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0};
        }
    },
});

export default router;
