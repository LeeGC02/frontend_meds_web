import { createRouter, createWebHistory } from "vue-router";
//import HomePageView from "../views/HomePageView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import AdminUsersView from "../views/AdminUsersView.vue";
import MainLayout from "../layouts/MainLayout.vue";
import { useUserStore } from '../store/user'
import PredictionView from "../views/PredictionView.vue";
import HistoricalView from "../views/HistoricalView.vue";
import ReportView from "../views/ReportView.vue";
import DownloadView from "../views/DownloadView.vue";

const routes = [
    //{ path: '/', name: 'HomePageView', component: HomePageView },
      // raíz redirige al dashboard
    { path: '/login', name: 'LoginView', component: LoginView },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', redirect: '/dashboard' },
        { path: 'dashboard', name: 'DashboardView', component: DashboardView }, // meta: { requiresAuth: true } comentado temporalmente
        { path: 'predicciones', name: 'PredictionView', component: PredictionView }, // meta: { requiresAuth: true } comentado temporalmente
        { path: 'historicos', name: 'HistoricalView', component: HistoricalView }, // meta: { requiresAuth: true } comentado temporalmente
        { path: 'reportes', name: 'ReportView', component: ReportView }, // meta: { requiresAuth: true } comentado temporalmente
        { path: 'descargas', name: 'DownloadView', component: DownloadView }, // meta: { requiresAuth: true } comentado temporalmente
        { path: 'admin/usuarios', name: 'AdminUsersView', component: AdminUsersView }, // meta: { requiresAuth: true, roles: ['ADMIN','SUPERUSER'] } comentado temporalmente
      ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// COMENTADO TEMPORALMENTE PARA ACCESO DIRECTO AL DASHBOARD
// router.beforeEach((to) => {
//   const user = useUserStore()
//   if (to.meta.requiresAuth && !user.isAuthenticated) {
//     return { path: '/login', query: { redirect: to.fullPath } }
//   }
//   if (to.meta.roles && !to.meta.roles.includes(user.role)) {
//     return { path: '/dashboard' }
//   }
//   // si ya está logueado y va al login, mándalo al dashboard
//   if (to.path === '/login' && user.isAuthenticated) {
//     return { path: '/dashboard' }
//   }
// })


export default router