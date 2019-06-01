<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-05 19:46:06
 * @LastEditTime: 2019-06-02 00:28:46
 -->
<template>
  <div class="content-scroll-wrapper">
    <main
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
            <img
              :src="item.url"
              @load="onImgLoad"
            >
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
              <transition name="success">
                <div
                  v-show="!props.isPullingDown"
                  class="text-wrapper"
                ><span class="refresh-text">有x条更新</span></div>
              </transition>
            </div>
          </div>
        </template>
      </cube-scroll>
    </main>
  </div>
</template>

<script type="text/ecmascript-6">
const imgs = [
  {
    url:
      "https://dpubstatic.udache.com/static/dpubimg/7EzIhoEvnG/toutiao_12.JPG"
  },
  {
    url:
      "https://dpubstatic.udache.com/static/dpubimg/GR0Piaf5sz/toutiao_21.JPG"
  },
  {
    url:
      "https://dpubstatic.udache.com/static/dpubimg/K1JqUN8HSA/toutiao_31.JPG"
  }
];

let cnt = 1;
export default {
  data() {
    return {
      content: imgs.slice(),
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
  components: {},
  methods: {
    onPullingDown() {
      setTimeout(() => {
        this.content.unshift(imgs[cnt++ % 3]);
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
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
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
    .imgs-wrapper {
      .imgs-item {
        > img {
          width: 100%;
        }
      }
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
      margin: 0;
      .text-wrapper {
        margin: 0 auto;
        margin-top: 14px;
        padding: 5px 0;
        color: #498ec2;
        background-color: #d6eaf8;
      }
      .cube-loading-spinners {
        margin: auto;
      }
      .loading{
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
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
</style>