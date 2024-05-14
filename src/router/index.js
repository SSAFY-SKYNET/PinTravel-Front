<<<<<<< Updated upstream
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import AboutView from "../views/AboutView.vue";
import MagazineView from "../views/MagazineView.vue";
import CreateView from "../views/CreateView.vue";
=======
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
>>>>>>> Stashed changes

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
<<<<<<< Updated upstream
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/magazine",
      name: "magazine",
      component: MagazineView,
    },
    {
      path: "/create",
      name: "create",
      component: CreateView,
    },
  ],
});
=======
      path: '/',
      name: 'home',
      component: HomeView
    }, {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})
>>>>>>> Stashed changes

export default router
