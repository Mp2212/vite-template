import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import Deploymentmetrics from '../components/Deploymentmetrics.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/Deploymentmetrics',
    name: 'Deploymentmetrics',
    component: Deploymentmetrics,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;