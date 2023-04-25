import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/home-page.vue";
import Register from "./pages/register.vue";
import Login from "./pages/login.vue";
import UserPanel from "./pages/userpanel.vue";
import UserModify from "./pages/usermodify.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/userpanel",
    component: UserPanel,
  },
  {
    path: "/usermodify",
    component: UserModify,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
