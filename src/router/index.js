import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LayoutNavbar from "../layouts/LayoutNavbar.vue";
import AppCatalog from "../components/AppCatalog.vue";
import TheMovie from "../views/TheMovie.vue";

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
        name: "AppCatalog",
        component: AppCatalog,
      },
    ],
  },
  {
    // карточка-компонент отдельнго фильма
    path: "/movies/:id",
    name: "TheMovie",
    component: TheMovie,
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
