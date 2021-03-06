import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../components/NotFound.vue";

const routes = [
    {
        // стартовый компонент страницы
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        // каталог фильмов
        path: "/movies",
        name: "AppCatalog",
        meta: {layout: 'navbar'},
        component: () => import("../components/catalog/CatalogMain.vue"),


    },
    {
        // карточка-компонент отдельного фильма
        path: "/movies/:id",
        name: "TheMovie",
        meta: {layout: 'empty'},
        component: () => import("../views/TheMovie.vue"),


        beforeEnter: (to, from, next) => {
            const result = /^\d+$/.test(to.params.id)
            if (result) {
                next()
            } else {
                next({name: 'NotFound'})
            }

        }
    },
    {
        // 404 по всем другим адресам
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,

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
