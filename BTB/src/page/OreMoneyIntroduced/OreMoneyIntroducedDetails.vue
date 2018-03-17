<!--
    Author: earl
    Create Time: 2018-03-15 14:58
    Description: 币种详情介绍
-->
<template>
    <div>
        <span class="title-style">比特币介绍</span>
        <div class="ore_content w">
            <div class="_title">
                <span class="title-name">简介</span>
                <p>江南雨，一夜报春意，桃花枝头笑春风，翠湖堤岸柳依依。晨曦初现莺啼晓。南风还，吹拂衣凌乱，逝水融融，草木葱，花意浓。三月春华泛青红，这此第，叫人如何不恋江南雨，陶醉江南十里枫。。。。。。

                    江南雨，一夜报春意。红了山桃，绿了芭蕉。雨打梧桐点点滴。杨柳依稀绽新芽，叶底子规声声啼。木屋小溪醉朝阳，洋洋和风报春急……</p>
            </div>
            <div class="_title">
                <span class="title-name">比特币参数</span>
                <div class="clearfix">
                    <div class="preferences-content fl">
                        <ul>
                            <li>
                                <span>中文名称：</span>
                                <span>比特币</span>
                            </li>
                            <li>
                                <span>比特币：</span>
                                <span>下载</span>
                            </li>
                            <li>
                                <span>区块奖励：</span>
                                <span>30,000个</span>
                            </li>
                        </ul>
                    </div>
                    <div class="preferences-content fl">
                        <ul>
                            <li>
                                <span>英文名：</span>
                                <span>BTC</span>
                            </li>
                            <li>
                                <span>核心算法：</span>
                                <span>Adobe</span>
                            </li>
                            <li>
                                <span>货币总量：</span>
                                <span>30,0000个</span>
                            </li>
                        </ul>
                    </div>
                    <div class="preferences-content fl">
                        <ul>
                            <li>
                                <span>中文名称：</span>
                                <span>比特币</span>
                            </li>
                            <li>
                                <span>发布日期：</span>
                                <span>2018-10-10</span>
                            </li>
                        </ul>
                    </div>
                    <div class="preferences-content fl">
                        <ul>
                            <li>
                                <span>研发团队：</span>
                                <span>比特币</span>
                            </li>
                            <li>
                                <span>区块时间：</span>
                                <span>10分钟</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="clearfix">
                    <div class="tag-kuai fl">钱包下载</div>
                    <div class="tag-kuai fl">钱包下载</div>
                    <div class="tag-kuai fl">钱包下载</div>
                    <div class="tag-kuai fl">钱包下载</div>
                </div>
                <div class="clearfix">
                    <ul>
                        <li class="fl pie-style">
                            <div class="pie-title">流通市值</div>
                            <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
                        </li>
                        <li class="fl pie-style">
                            <div class="pie-title">流通市值</div>
                            <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
                        </li>
                        <li class="fl pie-style">
                            <div class="pie-title">24H成交额</div>
                            <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="_title">
                <span class="title-name">挖矿软件安装及使用教程</span>
                <p>江南雨，一夜报春意，桃花枝头笑春风，翠湖堤岸柳依依。晨曦初现莺啼晓。南风还，吹拂衣凌乱，逝水融融，草木葱，花意浓。三月春华泛青红，这此第，叫人如何不恋江南雨，陶醉江南十里枫。。。。。。

                    江南雨，一夜报春意。红了山桃，绿了芭蕉。雨打梧桐点点滴。杨柳依稀绽新芽，叶底子规声声啼。木屋小溪醉朝阳，洋洋和风报春急……</p>
            </div>
        </div>
    </div>
</template>
<script>
    import VePie from 'v-charts/lib/pie'

    export default {
        created() {
            this.chartData = {
                columns: ['日期', '销售量'],
                rows: [
                    {'日期': '1月1日', '销售量': 123},
                    {'日期': '1月2日', '销售量': 1223},
                    {'日期': '1月3日', '销售量': 2123},
                    {'日期': '1月4日', '销售量': 4123},
                    {'日期': '1月5日', '销售量': 3123},
                    {'日期': '1月6日', '销售量': 7123}
                ]
            },
                this.chartSettings = {
                    radius: 50
                }
        },

        components: {VePie}
    }
</script>
<style scoped>
    .title-style {
        width: 100%;
        display: block;
        color: #fff;
        font-size: 23px;
        margin-bottom: 20px;
    }

    .ore_content {
        border-top: 1px dashed #bbb;
        border-bottom: 1px dashed #bbb;
    }

    ._title {
        color: #fff;
    }

    ._title .title-name {
        font-size: 16px;
        display: block;
        margin: 20px 0;
    }

    ._title p {
        min-height: 150px;
        background-color: #2e4f79;
        padding: 20px 35px;
        font-size: 14px;
        text-indent: 28px;
        line-height: 25px;
        margin-bottom: 30px;
    }

    ._title p a {
        color: #00aeff;
        text-decoration: underline;
    }

    .tag-kuai {
        background-color: #2e4f79;
        width: 150px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        color: #fff;
        border-radius: 8px;
        font-size: 18px;
        margin-right: 130px;
    }

    .preferences-content {
        width: 292px;
        line-height: 35px;
        margin-bottom: 30px;
        padding: 0 0 0 10px;
    }

    .pie-style {
        width: 250px;
        margin-right: 150px;
        margin-top: 30px;
        text-align: center;
    }

    .pie-style .pie-title {
        font-size: 16px;
        margin-bottom: 10px;
    }

</style>
