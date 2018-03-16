<!--
    Author: earl
    Create Time: 2018-03-15 15:01
    Description: 挖矿详情页
-->
<template>
    <div>
        <span class="title-style">蚂蚁S99挖矿软件介绍</span>
        <div class="ore_content w">
            <div class="_title">
                <span>简介</span>
                <p>江南雨，一夜报春意，桃花枝头笑春风，翠湖堤岸柳依依。晨曦初现莺啼晓。南风还，吹拂衣凌乱，逝水融融，草木葱，花意浓。三月春华泛青红，这此第，叫人如何不恋江南雨，陶醉江南十里枫。。。。。。

                    江南雨，一夜报春意。红了山桃，绿了芭蕉。雨打梧桐点点滴。杨柳依稀绽新芽，叶底子规声声啼。木屋小溪醉朝阳，洋洋和风报春急……</p>
            </div>
            <div class="_title">
                <span>支持挖矿币种</span>
                <div class="tag-kuai">ETC</div>
            </div>
            <div class="_title">
                <span>挖矿软件下载连接</span>
                <p><a href="https://earl8888.github.io/" target="_blank">https://earl8888.github.io/</a></p>
            </div>
            <div class="_title">
                <span>挖矿软件安装及使用教程</span>
                <p>江南雨，一夜报春意，桃花枝头笑春风，翠湖堤岸柳依依。晨曦初现莺啼晓。南风还，吹拂衣凌乱，逝水融融，草木葱，花意浓。三月春华泛青红，这此第，叫人如何不恋江南雨，陶醉江南十里枫。。。。。。

                    江南雨，一夜报春意。红了山桃，绿了芭蕉。雨打梧桐点点滴。杨柳依稀绽新芽，叶底子规声声啼。木屋小溪醉朝阳，洋洋和风报春急……</p>
            </div>
        </div>
    </div>
</template>
<script>
    import {quillEditor} from 'vue-quill-editor';

    export default {
        data: function () {
            return {
                input21: ''
            }
        }
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

    ._title span {
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
    }

</style>
