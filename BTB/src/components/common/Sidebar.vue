<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-demo" mode="horizontal" unique-opened router active-text-color="#ffd04b">
            <template v-for="item in items">
                <el-menu-item :index="item.index">
                    {{ item.title }}
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: [{
                    index: 'readme',
                    title: '咨询'
                },
                {
                    index: 'introductoryTutorial',
                    title: '挖矿入门教程'
                },
                {
                    index: 'market',
                    title: '行情'
                },
                {
                    index: 'millIntroduced',
                    title: '矿机介绍'
                },
                {
                    index: 'OreMoneyIntroduced',
                    title: '挖矿币种介绍'
                },
                {
                    index: 'wallet',
                    title: '钱包'
                },
                {
                    index: 'software',
                    title: '挖矿软件'
                },
                {
                    index: 'calculator',
                    title: '挖矿收益计算器'
                },
                {
                    index: 'feedback',
                    title: '意见反馈'
                }
            ]
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    }
}

</script>
<style scoped>
.sidebar {
    position: relative;
    margin: 0 auto;
    max-width: 1200px;
    padding: 0;
}

.sidebar>ul {
    height: 100%;
}

.el-menu-demo {
    background: transparent;
}

.el-menu-item,
.el-submenu__title {
    color: #fff;
}

.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item:hover,
.el-menu--horizontal.el-menu--dark .el-submenu .el-submenu-title:hover,
.el-menu-item:hover {
    background-color: transparent;
}

</style>
