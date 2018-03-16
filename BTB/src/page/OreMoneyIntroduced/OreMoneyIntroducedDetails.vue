<!--
    Author: earl
    Create Time: 2018-03-15 14:58
    Description: 币种详情介绍
-->
<template>
    <div>
        币种详情
    </div>
</template>

<script>
    export default {
        data() {
            return {
                shopId: null,
            }
        },
        created() {
            console.log('测试：'+this.$route.query.id);
        },
        methods: {

        },
        updated: function () {

        }
    }
</script>

<style scoped>

</style>
