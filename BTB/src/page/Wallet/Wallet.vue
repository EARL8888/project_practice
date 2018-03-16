<!--
    Author: earl
    Description: 钱包
-->
<template>
    <div>
        <span class="title-style">钱包</span>
        <div class="w clearfix tag-title">
            <div class="fl">
                <ul class="title-ul">
                    <li class="fl">BTC</li>
                    <li class="fl">BTC</li>
                    <li class="fl">BTC</li>
                    <li class="fl">BTC</li>
                    <li class="fl">BTC</li>
                    <li class="fl">BTC</li>
                </ul>
            </div>
            <div class="fr input-fr">
                <input
                    class="__input"
                    placeholder="请输入要查询的内容"
                    v-model="input21">
                <img class="fangdajing-img" src="../../assets/fangdajing.png">
            </div>
        </div>
        <div class="ore_content">
            <ul>
                <li>
                    <router-link :to="{path:'WalletDetails', query:{id:1112}}">
                        <div class="_kuai">
                            <div class="content-left">
                                <p class="content-left-title">NXT官方钱包</p>
                                <p class="content-left-time">12月28日</p>
                            </div>
                            <img src="../../assets/qianbao.png">
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path:'WalletDetails', query:{id:1112}}">
                        <div class="_kuai">
                            <div class="content-left">
                                <p class="content-left-title">NXT官方钱包</p>
                                <p class="content-left-time">12月28日</p>
                            </div>
                            <img src="../../assets/qianbao.png">
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path:'WalletDetails', query:{id:1112}}">
                        <div class="_kuai">
                            <div class="content-left">
                                <p class="content-left-title">NXT官方钱包</p>
                                <p class="content-left-time">12月28日</p>
                            </div>
                            <img src="../../assets/qianbao.png">
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path:'WalletDetails', query:{id:1112}}">
                        <div class="_kuai">
                            <div class="content-left">
                                <p class="content-left-title">NXT官方钱包</p>
                                <p class="content-left-time">12月28日</p>
                            </div>
                            <img src="../../assets/qianbao.png">
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path:'WalletDetails', query:{id:1112}}">
                        <div class="_kuai">
                            <div class="content-left">
                                <p class="content-left-title">NXT官方钱包</p>
                                <p class="content-left-time">12月28日</p>
                            </div>
                            <img src="../../assets/qianbao.png">
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path:'WalletDetails', query:{id:1112}}">
                        <div class="_kuai">
                            <div class="content-left">
                                <p class="content-left-title">NXT官方钱包</p>
                                <p class="content-left-time">12月28日</p>
                            </div>
                            <img src="../../assets/qianbao.png">
                        </div>
                    </router-link>
                </li>
            </ul>
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
        margin-bottom: 10px;
    }

    .ore_content {
        border-top: 1px dashed #bbb;
        border-bottom: 1px dashed #bbb;
        overflow: hidden;
    }

    li ._kuai {
        width: 293px;
        height: 140px;
        float: left;
        overflow: hidden;
        margin: 15px 15px 15px 15px;
        background-color: #2e4f79;
        padding: 30px 30px 30px 47px;
    }

    .content-left {
        float: left;
        margin-top: 60px
    }

    .content-left-title {
        font-size: 35px;
        color: #65cfff;
    }

    .content-left-time {
        font-size: 18px;
        color: #65cfff;
        margin-top: 25px;
    }

    li img {
        position: relative;
        float: right;
        top: 85px;
    }

    .tag-title {
        margin: 20px 0;
    }

    .title-ul li {
        background-color: #2e4f79;
        width: 100px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        margin: 0 10px;
        color: #fff;
        border-radius: 8px;
        font-size: 18px;
    }

    .input-fr {
        margin-right: 10px;
        margin-top: 5px;
    }
    .__input {
        height: 36px;
        position: relative;
        border-radius: 0px;
        border: none;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
        width: auto;
        top: 3px;
        right: -3px;
        padding-left: 10px;
    }

    .fangdajing-img {
        position: relative;
        height: 36px;
        top: 2.5px;
    }

</style>
