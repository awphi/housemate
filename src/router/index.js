import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Welcome from "../views/Welcome.vue";
import store from "@/store";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      // TODO give them some OOPS! not logged in message
      if (store.getters["getSelectedHouse"]) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/join/:id",
    name: "Join",
    component: Welcome,
  },
  { path: "/:pathMatch(.*)*", component: Welcome },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
