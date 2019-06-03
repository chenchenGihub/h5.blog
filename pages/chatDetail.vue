<!--
 * @Description: 主页
 * @Author: chenchen
 * @Date: 2019-05-02 19:47:28
 * @LastEditTime: 2019-06-02 22:12:15
 -->
<template>
  <CubePage>

    <template slot="content">
      <div class="wrapper">
        <Header>
          <template>
            <div class="header-b">
              <section class="h1 chat">Alex</section>
            </div>
          </template>
        </Header>
        <section class="content-scroll-wrapper">
          <div class="content-scroll-list-wrap">
            <cube-scroll
              ref="scroll"
              :data="content"
              :options="options"
              @pulling-down="onPullingDown"
              @pulling-up="onPullingUp"
            >
              <ul class="chat-wrapper">
                <li
                  v-for="(item, index) in content"
                  :key="index"
                  class="chat-item-box"
                >
                  {{item.from.nickName}}
                </li>
              </ul>
            </cube-scroll>
          </div>

        </section>
      </div>
    </template>

    <template slot="footer">
      <SendWord @sendMsg="sendMsg"></SendWord>
    </template>

  </CubePage>
</template>

<script>
import Header from "~/components/Header.vue";
import SubscribePage from "~/components/SubscribePage.vue";
import Notation from "~/components/Notation.vue";
import CubePage from "~/components/CubePage.vue";
import SendWord from "~/components/SendWord.vue";
import Cookie from "js-cookie";

export default {
  components: { Header, CubePage, SubscribePage, SendWord, Notation },
  data() {
    return {
      content: [
        {
          from: {
            userId: "dasdhjkashdak",
            nickName: "alex",
            word: "你好"
          },
          to: {
            userId: "dasdhjkashdak",
            nickName: "moly",
            word: "很高兴认识你"
          },
          time: new Date().toLocaleDateString()
        },
        {
          from: {
            userId: "dasdhjkashdak",
            nickName: "alex",
            word: "你好"
          },
          to: {
            userId: "dasdhjkashdak",
            nickName: "moly",
            word: "很高兴认识你"
          },
          time: new Date().toLocaleDateString()
        }
      ],
      options: {
        pullDownRefresh: {
          threshold: 10,
          // stop: 44,
          stopTime: 1000,
          txt: ""
        },
        pullUpLoad: true
      }
    };
  },

  methods: {
    onPullingUp() {
      this.$store.dispatch("user/logout", 123);
    },
    onPullingDown() {
      console.log(222);
    },
    sendMsg(word) {
      let data = {
        from: Cookie.get("id"),
        to: "5cb085f3abbf3dfc8d65ee47",
        msg: word
      };
      this.$socket.emit("sendWord", data);
    }
  },
  created() {},
  mounted() {},
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
  .content-scroll-wrapper {
    height: 100%;
    position: relative;
    .content-scroll-list-wrap {
      height: 100%;
      width: 100%;
      transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
      position: absolute;
      top: 0;
      bottom: 0;
      overflow: hidden;
    }
  }
}
</style>
