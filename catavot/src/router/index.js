import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import befor from "../views/BforHomeView.vue";
import favorite from "@/views/FavoriteView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Home/:id",
    name: "home",
    component: HomeView,
  },
  {
    path: "/befor",
    name: "beforHome",
    component: befor,
  },
  {
    path: "/favorite/:id",
    name: "favorite",
    component: favorite,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
