import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main";

const routes = [
  {
    path: "/:divOne?/:divTwo?/:divThree?/:postNo?",
    name: "main",
    component: Main,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
