import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Bracket from "../views/Bracket.vue";
import Create from "../views/Create.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Bracket",
    name: "Bracket",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Bracket,
  },
  {
    path: "/Create",
    name: "Create",
    component: Create,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
