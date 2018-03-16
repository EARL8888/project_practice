<!--
    Author: earl
    Description: 意见反馈
-->
<template>
    <div>
        <span class="title-style">意见和反馈</span>
        <span class="title-flag">您的每次反馈，都将助力我们做的更好</span>
        <div class="ore_content clearfix w">
            <textarea class="input-text" type="textarea" placeholder="请输入内容......"></textarea>
            <el-button class="button-sbmt" type="primary">提交</el-button>
        </div>
    </div>
</template>
<script>
    import {quillEditor} from 'vue-quill-editor';

    export default {
        data: function () {
            return {
                textarea2: '',
            }
        },
        components: {
            quillEditor
        },
        methods: {
            onEditorChange({editor, html, text}) {
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

    .title-flag {
        color: #fff;
        display: block;
        margin-bottom: 15px;
    }

    .ore_content {
        border-top: 1px dashed #bbb;
        border-bottom: 1px dashed #bbb;
        height: 650px;
    }

    .button-sbmt {
        color: #59b6e4;
        background-color: #2e5a84;
        width: 200px;
        margin-top: 20px;
        float: right;
    }

    .input-text {
        height: 300px;
        width: 1192px;
        margin-top: 20px;
        padding: 20px 35px;
        background-color: rgba(48, 91, 138, 0.5);
        border: transparent;
        font-size: 14px;
        color: #fff;
    }

    /**
       更改placeholder颜色
     */
    ::-webkit-input-placeholder { /* WebKit browsers */
        color: #00aeff;
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #00aeff;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #00aeff;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #00aeff;
    }

</style>
