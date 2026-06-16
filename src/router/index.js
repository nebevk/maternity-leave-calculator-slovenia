import { createRouter, createWebHistory } from "vue-router";
import Calculator from "../views/Calculator.vue";

const routes = [
  {
    path: "/",
    name: "Calculator",
    component: Calculator,
  },
  {
    // Secondary pages are lazy-loaded so they stay out of the initial bundle.
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: () => import("../views/Privacy.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
