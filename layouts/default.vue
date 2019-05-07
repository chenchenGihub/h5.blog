<!--
 * @Description: 布局
 * @Author: chenchen
 * @Date: 2019-05-02 19:47:28
 * @LastEditTime: 2019-05-07 10:12:11
 -->
<template>
  <div class="app">
    <nuxt />
   
  </div>
</template>
<script>


export default {
  components: {
   
  
  },
  data() {
    return {};
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.app {
  padding-top: 50px;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .fa {
    // font-size: 1.5rem;
    // color: white;
  }
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
