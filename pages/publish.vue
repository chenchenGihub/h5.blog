<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-07 09:56:31
 * @LastEditTime: 2019-05-07 17:12:36
 -->
<template>
  <CubePage
    type="scroll-view"
    class="mainpage"
  >

    <template slot="header">
      <Header>
        <template>
          <div>
            发布文章
          </div>
        </template>
      </Header>
    </template>

    <template slot="content">
      <header class="title-h">
        <cube-textarea v-model="contentForm.title" placeholder="请输入标题"></cube-textarea>
      </header>

      <Quilleditor
        ref="Quilleditor"
        @editorContent="editorContent"
        @editorContentText="editorContentText"
      ></Quilleditor>
      
    </template>

    <template slot="footer">
      <div class="btn-group">
        <cube-button @click="submit">发布</cube-button>
      </div>
    </template>

  </CubePage>
</template>
<script>
import CubePage from "~/components/CubePage.vue";
import Header from "~/components/Header.vue";
import Quilleditor from "~/components/Quilleditor.vue";
export default {
  components: {
    CubePage,
    Header,
    Quilleditor
  },
  data() {
    return {
      contentForm: {
        title: "",
        text: "",
        html: ""
      }
    };
  },
  methods: {
    editorContent(e) {
      this.contentForm.html = e;
    },
    editorContentText(t) {
      this.contentForm.text = t;
    },
    submit(){
      console.log(this.contentForm);
      
    }
  }
};
</script>

<style lang="scss" scoped>
.title-h {
  width: 100%;

  textarea {
    width: 100%;
    outline: none;
  }
}
.btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed !important;
  bottom: 0px;
  width: 100%;
  background: #eee;
  z-index: 1;
}
</style>


