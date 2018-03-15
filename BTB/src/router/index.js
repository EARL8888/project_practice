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
            component: resolve => require(['../components/common/Home.vue'], resolve),  // 首页
            children:[
                {
                    path: '/',
                    component: resolve => require(['../page/Consulting/Consulting.vue'], resolve)   // 挖矿咨询
                },
                {
                    path: '/introductoryTutorial',
                    component: resolve => require(['../page/IntroductoryTutorial/IntroductoryTutorial.vue'], resolve)   // 挖矿入门教程
                },
                {
                    path: '/market',
                    component: resolve => require(['../page/Market/Market.vue'], resolve)     // 行情
                },
                {
                    path: '/millIntroduced',
                    component: resolve => require(['../page/MillIntroduced/MillIntroduced.vue'], resolve)   // 矿机介绍
                },
                {
                    path: '/oreMoneyIntroduced',
                    component: resolve => require(['../page/OreMoneyIntroduced/OreMoneyIntroduced.vue'], resolve)    // 挖矿币种介绍
                },
                {
                    path: '/wallet',
                    component: resolve => require(['../page/Wallet/Wallet.vue'], resolve)     // 钱包
                },
                {
                    path: '/software',
                    component: resolve => require(['../page/Software/Software.vue'], resolve)       // 挖矿软件
                },
                {
                    path: '/calculator',
                    component: resolve => require(['../page/Calculator/Calculator.vue'], resolve)   // 挖矿收益计算器
                },
                {
                    path: '/feedback',
                    component: resolve => require(['../page/Feedback/Feedback.vue'], resolve)    // 意见反馈
                }
            ]
        }
    ]
})
