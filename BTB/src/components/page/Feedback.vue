<template>
    <div>
        <span class="title-style">意见和反馈</span>
        <span class="title-flag">您的每次反馈，都将助力我们做的更好</span>
        <div class="ore_content">
            <textarea class="input-text" type="textarea" placeholder="请输入内容......"></textarea>

            <el-button class="button-sbmt" type="primary">提交</el-button>
        </div>
    </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor';
export default {
    data: function() {
        return {
            textarea2: '',
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
    color: #fff;https://www.baidu.com/s?wd=microsoft+office+powerpoint&rsv_idx=2&tn=baiduhome_pg&ie=utf-8&rsv_cq=swf+%E8%BD%AC%E6%8D%A2%E6%88%90PPT&rsv_dl=0_right_recommends_merge_28335&euri=3557312
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
    overflow: hidden;
}

.button-sbmt {
    color: #59b6e4;
    background-color: #2e5a84;
    width: 200px;
    margin-top: 20px;
    float: right;
}

.input-text {
    margin-top: 20px;
    padding: 10px;
    height: 300px;
    width: 100%;
    background-color: rgba(48, 91, 138, 0.5);
    border: transparent;
    font-size: 14px;
    color: #fff;
}

</style>
