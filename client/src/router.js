import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/home-page.vue";
import Register from "./pages/register.vue";
import Login from "./pages/login.vue";
import UserPanel from "./pages/user-panel.vue";
import UserModify from "./pages/user-modify.vue";
import AdminPanel from "./pages/admin-panel.vue";
import AdminUserList from "./pages/admin-user-list.vue";
import AdminExerciseList from "./pages/admin-exercise-list.vue";
import AdminExerciseAdd from "./pages/admin-exercise-add.vue";
import AdminWorkoutAdd from "./pages/admin-workout-add.vue";
import AdminWorkoutList from "./pages/admin-workout-list.vue";
import AdminPostAdd from "./pages/admin-blog-add.vue";
import AdminPostList from "./pages/admin-blog-list.vue";
import WorkoutPage from "./pages/workout-page.vue";
import ExercisePage from "./pages/admin-exercise-page.vue";

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
    path: "/adminuserlist",
    component: AdminUserList,
  },
  {
    path: "/adminexerciselist",
    component: AdminExerciseList,
  },
  {
    path: "/adminexerciseadd",
    component: AdminExerciseAdd,
  },
  {
    path: "/adminworkoutadd",
    component: AdminWorkoutAdd,
  },
  {
    path: "/adminworkoutlist",
    component: AdminWorkoutList,
  },
  {
    path: "/adminpostadd",
    component: AdminPostAdd,
  },
  {
    path: "/adminpostlist",
    component: AdminPostList,
  },
  {
    name: "workout",
    path: "/workout/:id",
    component: WorkoutPage,
  },
  {
    name: "exercise",
    path: "/exercise/:id",
    component: ExercisePage,
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
