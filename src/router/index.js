import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LayoutNavbar from "../layouts/LayoutNavbar.vue";
import TheCatalog from "../components/TheCatalog.vue";
import TheMovie from "../views/Movie.vue";

const routes = [
  {
    // стартовый компонент страницы
    path: "",
    name: "Home",
    component: Home,
  },
  {
    // layout с navbar
    path: "/movies",
    name: "space",
    component: LayoutNavbar,
    children: [
      {
        path: "",
        name: "TheCatalog",
        component: TheCatalog,
      },
      {
        path: ":id",
        name: "TheMovie",
        component: TheMovie,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
