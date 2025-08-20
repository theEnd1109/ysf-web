import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [];

// 自动导入 router 文件夹下所有 .js 文件（递归）
const context = require.context('./', true, /^\.\/(?!index).*\.js$/);

context.keys().forEach(fileName => {
    const routeModule = context(fileName).default;
    if (Array.isArray(routeModule)) {
        routes.push(...routeModule);
    }
});

const router = new Router({
    mode: 'history', // 或 hash
    base: process.env.BASE_URL || '/',
    routes
});

export default router;