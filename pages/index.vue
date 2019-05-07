<!--
 * @Description: 主页
 * @Author: chenchen
 * @Date: 2019-05-02 19:47:28
 * @LastEditTime: 2019-05-07 11:17:43
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
            主页
          </div>
        </template>
        <template v-slot:right>
          <div
            class="publish"
            @click="publish"
          >
            发布
          </div>
        </template>
      </Header>
    </template>

    <template slot="content">
      <div class="content-scroll-wrapper">
        <div
          class="content-scroll-list-wrap"
          ref="scrollWrapper"
        >
          <cube-scroll
            ref="contentScroll"
            :data="content"
            :options="options"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp"
          >
            <ul class="imgs-wrapper">
              <li
                v-for="(item, index) in content"
                :key="index"
                class="imgs-item"
              >
                <!-- <img
                  :src="item.url"
                  @load="onImgLoad"
                > -->

                <section>
                  <section>{{item.title}}</section>
                  <section>{{item.text}}</section>
                </section>
              </li>
            </ul>
            <template
              slot="pulldown"
              slot-scope="props"
            >
              <div
                v-if="props.pullDownRefresh"
                class="cube-pulldown-wrapper"
                :style="props.pullDownStyle"
              >
                <div
                  v-if="props.beforePullDown"
                  class="before-trigger"
                  :style="{paddingTop: props.bubbleY + 'px'}"
                >
                  <span :class="{rotate: props.bubbleY > 0}">↓</span>
                </div>
                <div
                  class="after-trigger"
                  v-else
                >
                  <div
                    v-show="props.isPullingDown"
                    class="loading"
                  >
                    <cube-loading></cube-loading>
                  </div>
                  <!-- <transition name="success"> -->
                  <div
                    v-show="!props.isPullingDown"
                    class="text-wrapper"
                  ><span class="refresh-text">今日头条推荐引擎有x条更新</span></div>
                  <!-- </transition> -->
                </div>
              </div>
            </template>
          </cube-scroll>
        </div>
      </div>
    </template>

    <template slot="footer">
      <TabBar></TabBar>
    </template>

  </CubePage>
</template>

<script>
import CubePage from "~/components/CubePage.vue";
import Header from "~/components/Header.vue";
import TabBar from "~/components/TabBar.vue";
export default {
  components: {
    Header,
    CubePage,
    TabBar
  },
  data() {
    return {
      content: [],
      options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 44,
          stopTime: 1000,
          txt: "更新成功"
        },
        pullUpLoad: true
      },
      secondStop: 26
    };
  },
  methods: {
    async onPullingDown() {
      console.log();

      // this.$store.dispatch("");

      setTimeout(() => {
        // this.$refs.contentScroll.forceUpdate()

        this.content.unshift();

        this.$refs.contentScroll.scrollTo(0, this.secondStop, 300);
      }, 1000);
    },
    onPullingUp() {
      setTimeout(() => {
        this.content = this.content.concat(imgs);
      }, 1000);
    },
    onImgLoad() {
      const contentScroll = this.$refs.contentScroll;
      contentScroll.scroll.beforePullDown && contentScroll.refresh();
    },
    loadData() {},
    publish() {
      this.$router.push("./publish");
    }
  },
  async asyncData(context) {
    // 请检查您是否在服务器端
    // 使用 req 和 res

    const data = await context.store.$axios.$get("/api/article", {
      params: { skip: 0, count: 10 }
    });

    // console.log(data.data.articles);

    if (process.server) {
      // return { host: req.headers.host };
    }

    return { content: data.data.articles };
  },
  async fetch({ store, params }) {}
};
</script>

<style lang="scss" scoded>
.mainpage {
  .publish {
    color: #eee;
  }
  .content {
    margin: 0 !important;
    height: 100%;
    display: flex;
    flex-flow: column;
    height: calc(100% - 88px)!important;
    .content-scroll-wrapper {
      flex: 1;
      position: relative;
    
      .content-scroll-list-wrap {
        height: 100%;
        width: 100%;
        transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
        position: absolute;
        top: 0;
        bottom: 0;
        overflow: hidden;
        .imgs-wrapper {
          .imgs-item {
            background-color: #498ec2;
            margin-bottom: 10px;
            min-height: 50px;
            > section {
              width: 100%;
            }
          }
          .imgs-item:last-child {
           margin-bottom: 0%
          }
        }
        .cube-pulldown-wrapper {
          text-align: center;
          .before-trigger {
            height: auto;
            font-size: 30px;
            align-self: flex-end;
            span {
              display: inline-block;
              line-height: 1;
              transition: all 0.3s;
              color: #666;
              padding: 15px 0;
              &.rotate {
                transform: rotate(180deg);
              }
            }
          }
          .after-trigger {
            flex: 1;
            margin-top: 12px;
            margin-bottom: 10px;

            .text-wrapper {
              margin: 0 auto;
              margin-top: 14px;
              margin-bottom: 14px;
              padding: 10px 0;
              padding-top: 14px;
              color: #498ec2;
              background-color: #d6eaf8;
              // position: absolute;
              // top: 0;
              // z-index: 50;
              // width: 100%
            }
            .cube-loading-spinners {
              margin: auto;
            }
          }
          .success-enter-active,
          .success-leave-active {
            transition: width 0.5s;
          }
          .success-enter,
          .success-leave-to {
            width: 70%;
          }
          .success-enter-to,
          .success-leave {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
