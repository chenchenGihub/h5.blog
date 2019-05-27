<!--
 * @Description: 主页
 * @Author: chenchen
 * @Date: 2019-05-02 19:47:28
 * @LastEditTime: 2019-05-26 23:48:41
 -->
<template>
  <CubePage
    type="scroll-view"
    class="mainpage"
  >
    <template slot="header">
      <Header>
        <template>
          <div>主页</div>
        </template>
        <template v-slot:right>
          <div
            class="publish"
            @click="publish"
          >发布</div>
        </template>
      </Header>
    </template>

    <template slot="content">
      <main class="contents">
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
                  <section class="item-box">
                    <header class="item-header">
                      <div class="avatar-box">
                        <img
                          :src="item.user.avatar"
                          alt
                          srcset
                        >
                      </div>
                      <div class="username">
                        <section>{{item.user.name}}</section>
                        <section>{{item.user.description}}</section>
                      </div>
                    </header>
                    <section class="title">{{item.title}}</section>
                    <section
                      class="content1"
                      @click="goDetail(item)"
                    >
                      <section
                        v-if="item.imgs.length<=1"
                        class="contentemplisis"
                      >{{item.text.substring(0,100)}}{{item.text.length>100?"...":''}}</section>
                      <section
                        class="img-w"
                        v-if="item.imgs.length>=1"
                      >
                        <div
                          class="img-b"
                          v-for="(item, index) in item.imgs"
                          :key="index"
                        >
                          <img
                            :src="item"
                            alt
                            srcset
                          >
                        </div>
                      </section>
                    </section>

                    <footer class="operate">
                      <span>
                        <i class="fa fa-thumbs-up"></i>
                        <span>赞</span>
                      </span>
                      <span>
                        <i class="fa fa-comment"></i> 回复
                      </span>
                    </footer>
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
                    >
                      <span class="refresh-text">博客有{{1}}条更新</span>
                    </div>
                    <!-- </transition> -->
                  </div>
                </div>
              </template>
            </cube-scroll>
          </div>
        </div>
      </main>
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
import Cookie from "js-cookie";
export default {
  components: {
    Header,
    CubePage,
    TabBar
  },
  data() {
    return {
      content: [],
      searchValue: { skip: 0, count: 10 },
      options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 44,
          stopTime: 1000,
          txt: "更新成功"
        },
        pullUpLoad: true
      },
      secondStop: 26,
      pagination: {
        skip: 0,
        count: 10
      }
    };
  },
  methods: {
    async onPullingDown() {
      await this.$store.dispatch("article/getArticle", {
        params: { skip: 0, count: 10 }
      });

      let {
        articelList,
        total,
        success
      } = this.$store.state.article.articelListRes;

      this.content = [...articelList];

      this.$refs.contentScroll.scrollTo(0, this.secondStop, 300);
    },
    async onPullingUp() {
     
      
      if (this.$store.state.article.articelListRes.hasMore) {
        await this.$store.dispatch("article/getArticle", {
          params: { skip: this.pagination.skip + 10, count: 10 }
        });
         this.content = this.content.slice();
      }else{
        this.content = this.content.slice();
      }
    },
    onImgLoad() {
      const contentScroll = this.$refs.contentScroll;
      contentScroll.scroll.beforePullDown && contentScroll.refresh();
    },
    loadData() {},
    publish() {
      this.$router.push("./publish");
    },
    goDetail(item) {
      this.$router.push({
        path: "./article",
        query: {
          id: item._id,
          user_id: Cookie.get("id")
        }
      });
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

<style lang="scss" scoped>
.mainpage {
  .publish {
    color: #eee;
  }
  .contents {
    margin: 0 !important;
    display: flex;
    flex-flow: column;
    height: calc(100% - 88px) !important;
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
            background-color: #fff;
            margin-bottom: 10px;
            min-height: 50px;
            > .item-box {
              width: 100%;
              .item-header {
                display: flex;
                padding: 10px;
                .avatar-box {
                  margin-right: 10px;
                  img {
                    height: 50px;
                    border-radius: 50%;
                  }
                }
                .username {
                  display: flex;
                  align-items: center;
                }
              }

              .title {
                font-size: 1.1rem;
                font-weight: 900;
                padding: 10px;
              }
              .content1 {
                display: flex;
                .contentemplisis {
                  padding: 10px;
                  padding-top: 0;
                  // max-height: 100px;
                  // overflow: hidden;
                  // text-overflow: ellipsis;
                  // white-space: nowrap;

                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                  overflow: hidden;
                }
                .img-w {
                  display: flex;
                  // justify-content: center;
                  width: 100%;
                  .img-b {
                    width: 33vw;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                      height: 110px;
                      width: 90%;
                    }
                  }

                  .img-b:last-child {
                    img {
                      margin-right: 0px;
                    }
                  }
                }
              }
              .operate {
                padding: 10px;
              }
            }
          }
          .imgs-item:last-child {
            margin-bottom: 0%;
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
            display: flex;
            justify-content: center;
            width: 100%;
            margin-top: 12px;
            margin-bottom: 10px;

            .text-wrapper {
              width: 100%;
              margin: 0 auto;
              margin-top: 14px;
              margin-bottom: 14px;
              padding: 10px 0;
              padding-top: 14px;
              color: #498ec2;
              background-color: #d6eaf8;
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
