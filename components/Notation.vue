<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-06-02 00:31:30
 * @LastEditTime: 2019-06-02 01:44:12
 -->
<template>
  <div class="content-scroll-wrapper">
    <main
      class="content-scroll-list-wrap"
      ref="scrollWrapper"
    >
      <cube-scroll
        ref="scroll"
        :data="content"
        :options="options"
      >
        <ul class="word-wrapper" @click="chatDetail">
          <li
            v-for="(item, index) in content"
            :key="index"
            class="word-item-box"
          >
            <aside>
              <img
                class="avatar"
                :src="item.avatar"
                @load="onImgLoad"
              >
            </aside>
            <main class="word-item-right-box">
              <section class="top">
                <aside>{{item.nickName}}</aside>
                <section>{{item.lastTime}}</section>
              </section>
              <section class="bottom">
                <aside class="lastWord">{{item.lastWord}}</aside>
                <section class="badge-box">
                  <div class="badge">{{item.readNums}}</div>
                </section>
              </section>
            </main>

          </li>
        </ul>
      </cube-scroll>

    </main>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      content: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          nickName: "sadasda",
          lastWord: "哈哈哈哈哈哈哈哈哈哈",
          lastTime: "2s",
          readNums: 2
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          nickName: "sadasda",
          lastWord: "哈哈哈哈哈哈哈哈哈哈",
          lastTime: "2s",
          readNums: 2
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          nickName: "sadasda",
          lastWord: "哈哈哈哈哈哈哈哈哈哈",
          lastTime: "2s",
          readNums: 2
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          nickName: "sadasda",
          lastWord: "哈哈哈哈哈哈哈哈哈哈",
          lastTime: "2s",
          readNums: 2
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          nickName: "sadasda",
          lastWord: "哈哈哈哈哈哈哈哈哈哈",
          lastTime: "2s",
          readNums: 2
        }
      ],
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
    onPullingDown() {},
    onPullingUp() {},
    onImgLoad() {
      const contentScroll = this.$refs.scroll;
      contentScroll.scroll.beforePullDown && contentScroll.refresh();
    },
    chatDetail(){
        this.$router.push('./chatDetail')
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
    .word-wrapper {
      width: 100%;
      .word-item-box {
        width: 95%;
        display: flex;
        padding: 10px 10px 10px 10px;

        border-bottom: 1px solid #cccbcb;

        &:last-child {
          border: none;
        }
        .avatar {
          width: 40px;
          border-radius: 50%;
        }
        .word-item-right-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          margin-left: 10px;
          flex: 1;
          .top,
          .bottom {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .lastWord{
                color: #9a9999
            }
            .badge-box {
              .badge {
                width: 18px;
                height: 18px;
                border-radius: 10px;
                background: red;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>


      

    