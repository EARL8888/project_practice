<!--
    Author: earl
    Description: 挖矿币种介绍
-->
<template>
    <div>
        <span class="title-style">挖矿币种介绍</span>
        <div class="ore_content">
            <span class="hot-title">热门挖矿币种</span>
            <ul>
                <li>
                    <div class="content-left">
                        <p class="content-left-title">比特币</p>
                        <p class="content-left-time">12月28日</p>
                    </div>
                    <img src="../../assets/b.png">
                </li>
                <li>
                    <div class="content-left">
                        <p class="content-left-title">比特币</p>
                        <p class="content-left-time">12月28日</p>
                    </div>
                    <img src="../../assets/b.png">
                </li>
                <li>
                    <div class="content-left">
                        <p class="content-left-title">比特币</p>
                        <p class="content-left-time">12月28日</p>
                    </div>
                    <img src="../../assets/b.png">
                </li>
                <li>
                    <div class="content-left">
                        <p class="content-left-title">比特币</p>
                        <p class="content-left-time">12月28日</p>
                    </div>
                    <img src="../../assets/b.png">
                </li>
                <li>
                    <div class="content-left">
                        <p class="content-left-title">比特币</p>
                        <p class="content-left-time">12月28日</p>
                    </div>
                    <img src="../../assets/b.png">
                </li>
                <li>
                    <div class="content-left">
                        <p class="content-left-title">比特币</p>
                        <p class="content-left-time">12月28日</p>
                    </div>
                    <img src="../../assets/b.png">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor';
export default {
    data: function() {
        return {
            content: '<p>Hello BBK</p>',
            editorOption: {
                // something config
            }
        }
    },
    components: {
        quillEditor
    },
    methods: {
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        submit() {
            console.log(this.content);
            this.$message.success('提交成功！');
        }
    },
    computed: {
        editor() {
            return this.$refs.myTextEditor.quillEditor;
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

.hot-title{
    margin:15px 0 0 15px;
    color: #fff;
    display: block;
}

li {
    float: left;
    width: 293px;
    height: 140px;
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
}

li img {
    float: right;
    margin-top: 30px;
}

</style>
