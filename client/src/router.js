import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/home-page.vue";
import Register from "./pages/register.vue";
import Login from "./pages/login.vue";
import UserPanel from "./pages/user-panel.vue";
import UserModify from "./pages/user-modify.vue";
import AdminPanel from "./pages/admin-panel.vue";
import Users from "./pages/users.vue";

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
  },
  {
    path: "/adminpanel",
    component: AdminPanel,
  },
  {
    path: "/users",
    component: Users,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
