import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/home/index.vue";
import BaseReport from "@/views/baseReport/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/baseReport",
    name: "baseReport",
    component: BaseReport,
    redirect: { name: "websiteSummary" },
    children: [
      {
        path: "/accessAnalysis",
        name: "accessAnalysis",
        component: () =>
          import(/* webpackChunkName: "baseReport" */ "@/views/baseReport/accessAnalysis/RealTimeAccess.vue"),
      },
      {
        path: "/websiteSummary",
        name: "websiteSummary",
        component: () => import(/* webpackChunkName: "baseReport" */ "@/views/baseReport/websiteSummary/index.vue"),
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
