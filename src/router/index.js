/*
 * @Author: pimzh
 * @Date: 2021-03-09 10:58:38
 * @LastEditTime: 2021-03-11 09:51:47
 * @LastEditors: pimzh
 * @Description:
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "main",
    redirect: "/code-running"
  },
  {
    path: "/code-running",
    name: "code-running",
    component: () => import("@/views/CodeRunning"),
    redirect: {
      name: "view-design"
    },
    children: [
      {
        name: "view-design",
        path: "view-design",
        component: () => import("@/views/ViewDesign")
      },
      {
        name: "element-ui",
        path: "element-ui",
        component: () => import("@/views/ElementUI")
      }
    ]
  }
];

const router = new Router({
  mode: "hash",
  base: "vue-online-editor",
  routes
});

export default router;
