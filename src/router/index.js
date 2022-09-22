import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main";
import PostDetailVue from "@/views/PostDetail.vue";

const routes = [
  {
    path: "/:nav*",
    name: "main",
    component: Main,
  },
  {
    path: "/:nav+/1",
    name: "detail",
    component: PostDetailVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
