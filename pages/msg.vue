<!--
 * @Description: 主页
 * @Author: chenchen
 * @Date: 2019-05-02 19:47:28
 * @LastEditTime: 2019-06-02 23:03:42
 -->
<template>
  <CubePage>

    <template slot="content">
      <div class="wrapper">
        <Header>
          <template>
            <div class="header-b">
              <section
                class="h1 chat"
                :style="[{color:index===0?'#000':'#fff'}]"
              >关注</section>
              <section
                class="h1 notation"
                :style="[{color:index===0?'#fff':'#000'}]"
              >通知</section>
              <div class="line"></div>
            </div>
          </template>
        </Header>
        <section class="container">
          <cube-slide
            ref="slide"
            :data="items"
            :initial-index="0"
            :options="options"
            :loop="false"
            :auto-play="false"
            :showDots='false'
            @scroll="scrolling($event)"
            @scroll-end="scrollend"
            @change="change"
          >
            <cube-slide-item>
              <div class="chat-b">
                <SubscribePage>
                  
                </SubscribePage>
              </div>
            </cube-slide-item>
            <cube-slide-item>
              <div class="notation-b">
                <Notation></Notation>
              </div>
            </cube-slide-item>
          </cube-slide>
        </section>
      </div>
    </template>

    <template slot="footer">
      <TabBar></TabBar>
    </template>

  </CubePage>
</template>

<script>
import Header from "~/components/Header.vue";
import SubscribePage from "~/components/SubscribePage.vue";
import Notation from "~/components/Notation.vue";
import CubePage from "~/components/CubePage.vue";
import TabBar from "~/components/TabBar.vue";

export default {
  components: { Header, CubePage, SubscribePage, TabBar,Notation },
  data() {
    return {
      index: 0,
      topTabWidth: "",
      options: {
        listenScroll: true,
        probeType: 3
      },
      items: []
    };
  },

  methods: {
    submit() {
      this.$store.dispatch("user/logout", 123);
    },
    scrolling({ x, y }) {
      /**
       * 通过x:偏移量
       * 和视口宽度算出其相对比例
       */
      let percent = -x / document.body.clientWidth;

      /**
       * 必须减去自身的宽度
       */
      document.querySelector(".line").style.left =
        percent * (this.topTabWidth - this.lineWidth) + "px";
      document.querySelectorAll(".h1")[0].style.color = `rgba(${255 *
        percent},${255 * percent},${255 * percent},1)`;
      document.querySelectorAll(".h1")[0].style.fontSize =
        this.fontSize + (20 - this.fontSize) * (1 - percent) + "px";
      document.querySelectorAll(".h1")[1].style.fontSize =
        this.fontSize + (20 - this.fontSize) * percent + "px";
      document.querySelectorAll(".h1")[1].style.color = `rgba(${255 *
        (1 - percent)},${255 * (1 - percent)},${255 * (1 - percent)},1)`;
    },
    scrollend(x) {
      this.index = x;
    },
    change(index) {}
  },
  created() {
    this.$socket.on("hi", function(data) {
      console.log(data);
      // socket.emit("giveToYou", { my: "data" });
    });
  },
  mounted() {

    this.$socket.on('receiveMsg',(data)=>{
      console.log(data);
      
    })

    let style = window.getComputedStyle(
      document.querySelector(".header-b"),
      null
    );

    this.topTabWidth = +style.getPropertyValue("width").replace("px", "");

    this.lineWidth = +window
      .getComputedStyle(document.querySelector(".line"), null)
      .getPropertyValue("width")
      .replace("px", "");

    this.fontSize = +window
      .getComputedStyle(document.querySelector(".h1"), null)
      .getPropertyValue("font-size")
      .replace("px", "");
  },
  async asyncData(context) {
    // 请检查您是否在服务器端
    // 使用 req 和 res

    if (process.server) {
      // return { host: req.headers.host };
    }

    return {};
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  .header-b {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 24%;
    position: absolute;
    .line {
      width: 40px;
      height: 2px;
      background: #35495e;
      position: absolute;
      left: 0;
      bottom: 9px;
    }
  }
  .container {
    margin: 0 auto;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .chat-b {
      height: 100%;
      width: 100vw;
    
    }
    .notation-b {
      height: 100%;
      width: 100vw;
     
    }
  }
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
