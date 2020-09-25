import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import HomeDark from "../views/Home@v1.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/home-dark",
    name: "HomeDark",
    component: HomeDark
  }
];

const router = new VueRouter({
  routes
});

export default router;
