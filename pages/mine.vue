<!--
 * @Description: 主页
 * @Author: chenchen
 * @Date: 2019-05-02 19:47:28
 * @LastEditTime: 2019-05-03 21:53:11
 -->
<template>
  <section class="container">
    <div>
     
        <cube-button @click="submit">我的</cube-button>
     
    </div>
  </section>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },
  methods: {
    submit() {
      this.$store.dispatch("user/logout", 123);
    }
  },
  async asyncData(context) {
    // 请检查您是否在服务器端
    // 使用 req 和 res
  
    // console.log(context);
    
    if (process.server) {
      // return { host: req.headers.host };
    }

    return {};
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 10px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
