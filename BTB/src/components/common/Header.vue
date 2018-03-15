<template>
    <div class="w">
        <div class="header-style">
        <span class="logo">
            <img src="../../assets/logo.png" height="35" width="183">
        </span>
            <el-row :gutter="1">
                <el-col :span="3">
                    <div class="btb-type">
                        <p class="type">BTC/Bithumb</p>
                        <p class="btb_nb">72131</p>
                    </div>
                    <img class="up-style" src="../../assets/up.png">
                </el-col>
                <el-col :span="3">
                    <div class="btb-type">
                        <p class="type">BTC/Bithumb</p>
                        <p class="btb_nb">72131</p>
                    </div>
                    <img class="up-style" src="../../assets/up.png">
                </el-col>
                <el-col :span="3">
                    <div class="btb-type">
                        <p class="type">BTC/Bithumb</p>
                        <p class="btb_nb">72131</p>
                    </div>
                    <img class="up-style" src="../../assets/up.png">
                </el-col>
                <el-col :span="3">
                    <div class="btb-type">
                        <p class="type">BTC/Bithumb</p>
                        <p class="btb_nb">72131</p>
                    </div>
                    <img class="up-style" src="../../assets/up.png">
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>


</script>
<style scoped>
    .header-style {
        position: relative;
        margin: 0 auto;
        max-width: 1200px;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        line-height: 70px;
        color: #fff;
    }

    .logo {
        float: left;
    }

    .logo img {
        display: inherit;
        margin-top: 28px;
        margin-right: 80px
    }

    .btb-type {
        float: left;
    }

    .type {
        height: 14px;
        font-size: 14px;
    }

    .btb_nb {
        height: 24px;
        font-size: 24px;
        margin-top: 10px;
        margin-left: 10px;
    }

    .up-style {
        margin-bottom: -30px;
    }

    .nuber-style {
        margin-left: 80px
    }

</style>
