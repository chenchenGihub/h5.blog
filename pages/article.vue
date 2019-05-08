<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-07 09:56:31
 * @LastEditTime: 2019-05-08 18:01:59
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
            文章详情
          </div>
        </template>
      </Header>
    </template>

    <template slot="content">

      <main class="ql-snow">
        <div class="comment-scroll-wrapper">
          <div
            class="comment-scroll-list-wrap"
            ref="scrollWrapper"
          >
            <cube-scroll
              ref="commentScroll"
              :data="comments"
              :options="options"
              @pulling-up="onPullingUp"
            >

              <header class="header-b">
                <aside class="img-b">
                  <img
                    :src="user.avatar"
                    alt=""
                    srcset=""
                  >
                </aside>
                <main>
                  <section>{{user.name}}</section>
                  <section>{{user.description}}</section>
                </main>
              </header>

              <article
                class="ql-editor article"
                v-html="content.html"
              ></article>
              <div class="seperater"></div>
              <ul class="imgs-wrapper">
                <li
                  v-for="(item, index) in comments"
                  :key="index"
                  class="imgs-item"
                >
                  {{item.comment}}
                </li>
              </ul>
            </cube-scroll>
          </div>
        </div>
      </main>
    </template>

    <template slot="footer">
      <div class="operate">
        <span><i class="fa fa-thumbs-up"></i> <span>赞</span></span>
        <span @click="reply"><i class="fa fa-comment"></i><span>回复</span> </span>
        <span><i class="fa fa-edit"></i> <span>转发</span> </span>
      </div>
    </template>

  </CubePage>
</template>
<script>
import CubePage from "~/components/CubePage.vue";
import Header from "~/components/Header.vue";
export default {
  components: {
    CubePage,
    Header
  },
  data() {
    return {
      user: {
        name: "",
        avatar: "",
        description: ""
      },
      content: {
        title: "",
        text: "",
        html: "",
        imgs: []
      },
      dialog:null,
      comments: [
        {
          comment: "哈哈哈哈哈"
        },
        {
          comment: "哈哈哈哈哈"
        },
        {
          comment: "哈哈哈哈哈"
        },
        {
          comment: "哈哈哈哈哈"
        },
        {
          comment: "哈哈哈哈哈"
        },
        {
          comment: "哈哈哈哈哈"
        },
        {
          comment: "哈哈哈哈哈"
        },
        {
          comment: "哈哈哈哈哈"
        },
        {
          comment: "哈哈哈哈哈"
        },
        {
          comment: "哈哈哈哈哈"
        },
        {
          comment: "哈哈哈哈哈"
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
      }
    };
  },
  methods: {
    onPullingUp() {
      console.log(222);
    },
    reply() {
      this.dialog = this.$createDialog({
        type: "prompt",
        title: "添加评论",
        prompt: {
          value: "",
          placeholder: "请输入"
        },
        onConfirm: (e, promptValue) => {

          

          // this.$createToast({
          //   type: "warn",
          //   time: 1000,
          //   txt: `Prompt value: ${promptValue || ""}`
          // }).show();

        }
      }).show();
    }
  },
  async asyncData(context) {
    // 请检查您是否在服务器端
    // 使用 req 和 res

    // console.log(context.route.query);

    const { data } = await context.store.$axios.$get("/api/getSingleArticle", {
      params: { id: context.route.query.id }
    });

    console.log(data.author);

    if (process.server) {
      // return { host: req.headers.host };
    }

    return {
      content: {
        title: data.title,
        text: data.text,
        html: data.html
      },
      user: {
        name: data.author.userName,
        description: data.author.description,
        avatar: data.author.avatarUrl,
        id: data.author._id
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.mainpage {
  .content {
    margin: 0 !important;
    display: flex;

    .ql-snow {
      display: flex;
      height: 100%;
      flex-flow: column;
      height: calc(100% - 88px) !important;
      .header-b {
        display: flex;
        margin: 10px;
        .img-b {
          img {
            height: 40px;
            border-radius: 50%;
          }
        }
      }

      .comment-scroll-wrapper {
        flex: 1;
        position: relative;
        .comment-scroll-list-wrap {
          height: 100%;
          width: 100%;
          transform: rotate(0deg);
          position: absolute;
          top: 0;
          bottom: 0;
          overflow: hidden;
          .seperater {
            height: 10px;
            background-color: #fff;
            margin-bottom: 10px;
          }
          /deep/ .cube-pullup-wrapper {
            height: 44px;
            .after-trigger {
              padding: 0;
            }
          }
        }
      }
    }
  }
  .operate {
    position: fixed;
    bottom: 0;
    height: 44px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: #fff;
  }
}
</style>


