<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-03 20:26:12
 * @LastEditTime: 2019-06-02 22:00:54
 -->
<template>
  <div class="send-wrapper">
    <cube-input class="input" v-model="value" ></cube-input>
    <section @click="sendMsg" class="send-button">发送</section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: null
    };
  },
  props: {},
  methods: {
    sendMsg() {
        if (!this.value) {
            return
        }
        this.$emit('sendMsg',this.value);

        this.value = null;
    },
   
  },

  created() {}
};
</script>
<style lang="scss" scoped>
.send-wrapper {
  position: fixed !important;
  bottom: 0px;
  width: 100%;
  background: #eee;
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
    padding: 10px;
    background: #e6e6e6;
    .input{
        flex: 3
    }
    .send-button{
        flex: 1;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #0954d0
    }
}
</style>

