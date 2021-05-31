import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import TheMovie from "../views/TheMovie.vue";
import AppCatalog from "../components/AppCatalog.vue";

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
        name: "AppCatalog",
        component: AppCatalog,

    },
    {
        // карточка-компонент отдельного фильма
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
