<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-demo" mode="horizontal" theme="dark" unique-opened router>
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
                items: [
                    {
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
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
    width: 100%;
    top: 70px;
    background: #2E363F;
    }
    .sidebar > ul {
        padding: 0 200px;
        height:100%;
    }
</style>
