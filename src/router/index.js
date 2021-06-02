import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import TheMovie from "../views/TheMovie.vue";
import AppCatalog from "../components/catalog/AppCatalog.vue";
import NotFound from "../components/NotFound.vue";
import store from '../store'

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
        component: AppCatalog,

    },
    {
        // карточка-компонент отдельного фильма
        path: "/movies/:id",
        name: "TheMovie",
        component: TheMovie,

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
        component: NotFound
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
