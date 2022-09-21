import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main";
import PostDetailVue from "@/views/PostDetail.vue";

const routes = [
  {
    path: "/:divOne?/:divTwo?/:divThree?/:postNo?",
    name: "main",
    component: Main,
  },
  {
    path: "/1",
    name: "detail",
    component: PostDetailVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
