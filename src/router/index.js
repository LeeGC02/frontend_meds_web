import { createRouter, createWebHistory } from "vue-router";
import HomePageView from "../views/HomePageView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
    {path: '/', name: 'HomePageView', component: HomePageView},
    {path: '/login', name: 'LoginView', component: LoginView},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router