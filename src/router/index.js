import { createRouter, createWebHistory } from "vue-router";
import Calculator from "../views/Calculator.vue";
import About from "../views/About.vue";
import Privacy from "../views/Privacy.vue";

const routes = [
  {
    path: "/",
    name: "Calculator",
    component: Calculator,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: Privacy,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
