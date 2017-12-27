import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/readme'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Consulting.vue'], resolve)
                },
                {
                    path: '/introductoryTutorial',
                    component: resolve => require(['../components/page/IntroductoryTutorial.vue'], resolve)
                },
                {
                    path: '/market',
                    component: resolve => require(['../components/page/Market.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/millIntroduced',
                    component: resolve => require(['../components/page/MillIntroduced.vue'], resolve)
                },
                {
                    path: '/oreMoneyIntroduced',
                    component: resolve => require(['../components/page/OreMoneyIntroduced.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/wallet',
                    component: resolve => require(['../components/page/Wallet.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/software',
                    component: resolve => require(['../components/page/Software.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/calculator',
                    component: resolve => require(['../components/page/Calculator.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/feedback',
                    component: resolve => require(['../components/page/Feedback.vue'], resolve)    // 拖拽列表组件
                }
            ]
        }
    ]
})
