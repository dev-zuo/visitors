import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Overview from "@/views/overview/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/overview",
    name: "overview",
    component: Overview,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import(/* webpackChunkName: "overview" */ "@/views/overview/Dashboard.vue"),
      },
      {
        path: "/realtime",
        name: "realtime",
        component: () => import(/* webpackChunkName: "overview" */ "@/views/overview/Realtime.vue"),
      },
    ],
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
