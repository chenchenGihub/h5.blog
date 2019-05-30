<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-03 20:26:12
 * @LastEditTime: 2019-05-29 23:42:51
 -->
<template>
  <div class="tabbar">
    <cube-tab-bar
      v-model="selectedLabelDefault"
      @click="clickHandler"
      @change="changeHandler"
    >
      <cube-tab
        v-for="(item) in tabs"
        :label="item.label"
        :key="item.label"
      >
       
          <!-- name为icon的插槽 -->
          <i
            slot="icon"
            :class="item.icon"
          ></i>
          <!-- 默认插槽 -->
          {{item.label}}
       
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedLabelDefault: "主页",
      tabs: [
        {
          label: "主页",
          icon: "cubeic-home"
        },
        {
          label: "关注",
          icon: "cubeic-vip"
        },
        {
          label: "我的",
          icon: "cubeic-person"
        }
      ]
    };
  },
  props: {},
  methods: {
    clickHandler(label) {
      switch (label) {
        case "主页":
          this.$router.push("/");
          break;
        case "消息":
          this.$router.push("./msg");
          break;
        case "我的":
          this.$router.push("./mine");
          break;
        default:
          break;
      }
    },
    changeHandler(label) {
     
    }
  },
 async asyncData(context) {
     
  },
  created(){
  let path =   this.$route.path.replace('/','');

     switch (path) {
         case 'msg':
             this.selectedLabelDefault="消息"
             break;
         case 'mine':
             this.selectedLabelDefault="我的"
             break;
         case '':
             this.selectedLabelDefault="主页"
             break;
     
         default:
             break;
     }
      
  }
};
</script>
<style lang="scss" scoped>
.tabbar {
  position: fixed !important;
  bottom: 0px;
  width: 100%;
  background: #eee;
  z-index: 1;
  .cube-tab {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>

