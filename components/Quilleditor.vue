<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-04-21 22:01:46
 * @LastEditTime: 2019-05-07 16:18:28
 -->
<template>
    <section class="container"
      
        element-loading-text="请稍等，图片上传中">
        <input class="file" type="file" style="display:none" id="file" ref="input" @change="doUpload">
        <div class="quill-editor"
            :content="content"
            @change="onEditorChange($event)"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            v-quill:myQuillEditor="editorOption">
        </div>
       
    </section>
</template>
<script>
import hljs from 'highlight.js'    // 语法高亮
import { Uploadfile } from '~/assets/js/upload'  // 气牛上传封装
export default {
    data () {
        const self = this
        return {
            content: "",
            isLoading: false,
            editorOption: {
                placeholder: this.placeholder,
                modules: {
                    toolbar: {
                        container:['bold', 'italic', 'underline',{'list': 'ordered'}, {'list': 'bullet'}, 'image','code-block'],
                    },
                    syntax: {
                        highlight: text => hljs.highlightAuto(text).value    // 语法高亮插件调用
                    },
                }
            },
            upload:null
        }
    },
    props: {
        placeholder: {
            type: String,
            default: '输入描述内容'
        }
    },
    mounted() {
        this.myQuillEditor.getModule('toolbar').addHandler('image', this.imgHandler);  // 更改原有的base64图片上传

        this.upload = new Uploadfile();

       
        
        
    },
    methods: {
        handleRemove (file, fileList) {
            console.log(file, fileList)
        },
        handlePreview (file) {
            console.log(file)
        },
        onEditorBlur (editor) {
            console.log('editor blur!', editor)
        },
        onEditorFocus (editor) {
            
        },
        onEditorReady (editor) {
            console.log('editor ready!', editor)
        },
        onEditorChange ({editor, html, text}) {
            // console.log('editor change!', editor, html, text)
            if(/<span class="ql-cursor">.*<\/span>/.test(html) || this.content == html) return     // 不加这行判断，会陷入死循环
            this.content = html
            this.$emit('editorContent', html);
            this.$emit('editorContentText', text);
        },
        imgHandler (handle) {
            let inputfile = document.getElementById('file')
            inputfile.click()
        },
        doUpload: async function () {
            this.isLoading = true
            let file = document.getElementById('file').files[0];
            
            if(file) {
                let {res} = await this.upload.uploadFile(file,file.name)      // upload封装上传七牛
               
                let fileUrl = res.requestUrls[0]    
                //将url插入到富文本中
                if (fileUrl !== null && fileUrl.length > 0) {
                    //光标位置
                    let cursorAddRange = this.myQuillEditor.getSelection();
                    //插入内容
                    this.myQuillEditor.insertEmbed(cursorAddRange !== null ? cursorAddRange.index : 0, 'image', fileUrl);
                    //调整光标位置在图片之后
                    this.myQuillEditor.setSelection(cursorAddRange.index + 1);
                } else {
                    this.$message.error(`image插入失败`);
                }
                //清空inout内容
                document.getElementById('file').value = "";
                this.isLoading = false
            }else {
                
            }
        }
    },
}
</script>


<style scoped>
    .container{
        color: black;
        height: 400px;
      
    }
</style>
