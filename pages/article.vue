<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-07 09:56:31
 * @LastEditTime: 2019-05-10 00:32:37
 -->
<template>
  <CubePage type="scroll-view" class="mainpage">
    <template slot="header">
      <Header>
        <template>
          <div>文章详情</div>
        </template>
      </Header>
    </template>

    <template slot="content">
      <main class="ql-snow">
        <div class="comment-scroll-wrapper">
          <div class="comment-scroll-list-wrap" ref="scrollWrapper">
            <cube-scroll
              ref="commentScroll"
              :data="comments"
              :options="options"
              @pulling-up="onPullingUp"
            >
              <header class="header-b">
                <aside class="img-b">
                  <img :src="user.avatar" alt srcset>
                </aside>
                <main>
                  <section>{{user.name}}</section>
                  <section>{{user.description}}</section>
                </main>
              </header>

              <article class="ql-editor article" v-html="content.html"></article>
              <div class="seperater"></div>
              <ul class="comment-wrapper">
                <li v-for="(item, index) in comments" :key="index" class="comment-item">
                  <main class="comment-b">
                    <aside>
                      <img :src="item.user.avatar" alt srcset>
                    </aside>
                    <section class="comment-u-b">
                      <div class="comment-u">
                        <strong>{{item.user.userName}}</strong>
                        <div class="author-txt" v-if="item.user.isAuthor">作者</div>
                        <!-- <i>{{item.user.userName}}</i> -->
                      </div>
                      <article>{{item.comment}}</article>
                      <section class="comment-o-b">
                        <div class="label-c">
                          <span>{{index+1}}楼</span>
                          <span class="time">{{new Date(item.createdAt).toLocaleString()}}</span>
                          <span
                            class="reply-txt"
                            v-if="item.children_comment.length>0"
                          >{{item.children_comment.length}}回复</span>
                        </div>
                        <div class="operate-i">
                          <span class>
                            <i class="fa fa-thumbs-up"></i>
                          </span>
                          <span>
                            <i class="fa fa-comment" @click="replyComment(0,item)"></i>
                          </span>
                        </div>
                      </section>

                      <section class="comment-children-b" v-if="item.children_comment.length>0">
                        <div
                          class="c-c-b-1"
                          v-for="(item, index) in item.children_comment"
                          :key="index"
                        >
                          <aside class="aside">
                            <img :src="item.user_from.avatar" alt srcset>
                          </aside>
                          <main class="comment-b1">
                            <section class="username">
                              {{item.user_from.userName}}
                              <div class="author-txt" v-if="item.user_from.isAuthor">作者</div>
                              <div class="floorOwner-txt" v-else-if="item.user_from.isFloorOwner">楼主</div>
                               <span class="thumb-up">
                                <i class="fa fa-thumbs-up"></i>
                              </span>
                            </section>
                            <section @click="replyComment(1,item)"  class="comment">
                              <span class="commentTxt" v-html="item.commentTxt"></span>
                             
                            </section>
                          </main>
                        </div>
                      </section>
                    </section>
                  </main>
                </li>
              </ul>
            </cube-scroll>
          </div>
        </div>
      </main>
    </template>

    <template slot="footer">
      <div class="operate">
        <span>
          <i class="fa fa-thumbs-up"></i>
          <span>赞</span>
        </span>
        <span @click="reply">
          <i class="fa fa-comment"></i>
          <span>回复</span>
        </span>
        <span>
          <i class="fa fa-edit"></i>
          <span>转发</span>
        </span>
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
      dialog: null,
      commentForm: {
        textValue: "",
        articleId: "",
        userId: ""
      },
      replyForm: {
        type: 0,
        comment: "",
        replytouserid: "",
        articleId: "",
        userId: "",
        parentcommentid: ""
      },
      comments: [],
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
      this.loadComments();
    },
    reply() {
      this.dialog = this.$createDialog({
        type: "prompt",
        title: `${"评论文章"}`,
        prompt: {
          value: "",
          placeholder: "请输入"
        },
        onConfirm: async (e, promptValue) => {
          this.commentForm.textValue = promptValue;
          this.commentForm.userId = JSON.parse(
            sessionStorage.getItem("user")
          ).id;
          this.commentForm.articleId = this.$route.query.id;

          await this.$store.dispatch("comment/comments", {
            ...this.commentForm
          });

          if (this.$store.state.comment.commentsRes.success) {
            this.dialog.hide();
            this.commentForm.textValue = "";

            this.loadComments();

            this.$createToast({
              type: "success",
              time: 1000,
              txt: `Prompt value: ${"评论成功" || ""}`
            }).show();
          }
        }
      }).show();
    },
    async loadComments() {
      await this.$store.dispatch("comment/commentlist", {
        articleId: this.$route.query.id
      });

      if (this.$store.state.comment.commentListRes.success) {
        this.comments = this.$store.state.comment.commentListRes.commentList;
      }
    },
    /**
     * type===1：回复评论区的用户,
     * type===0:回复楼主
     */
    replyComment(type, item) {
      this.dialog = this.$createDialog({
        type: "prompt",
        title: `@${type ? item.user_from.userName : item.user.userName}`,
        content: `${item.comment}`,
        prompt: {
          value: "",
          placeholder: "请输入"
        },
        onConfirm: async (e, promptValue) => {
          this.replyForm.type = type;
          this.replyForm.comment = promptValue;
          this.replyForm.userId = JSON.parse(sessionStorage.getItem("user")).id;
          this.replyForm.replytouserid = type ? item.user_to : item.user.userId;
          this.replyForm.parentcommentid = type
            ? item.parentcommentid
            : item._id;

          await this.$store.dispatch("comment/reply", {
            ...this.replyForm
          });

          if (this.$store.state.comment.commentsRes.success) {
            this.dialog.hide();
            this.commentForm.textValue = "";

            this.loadComments();

            this.$createToast({
              type: "success",
              time: 1000,
              txt: `${"评论成功" || ""}`
            }).show();
          }
        }
      }).show();
    },
    goUser(id){
      console.log(id);
      
    }
  },
  async asyncData(context) {
    // 请检查您是否在服务器端
    // 使用 req 和 res

    const { data } = await context.store.$axios.$get("/api/getSingleArticle", {
      params: { id: context.route.query.id }
    });

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

      article {
        word-break: break-all;
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

          .comment-wrapper {
            // padding: 10px;
            .comment-item {
              border-bottom: 1px solid rgb(255, 255, 255);
              min-height: 80px;
              .comment-b {
                display: flex;
                margin-top: 10px;
                aside {
                  margin: 0 10px;
                  img {
                    width: 40px;
                    border-radius: 50%;
                  }
                }
                .comment-u-b {
                  width: 100%;
                  margin-right: 10px;
                  .comment-u {
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    .author-txt {
                      border: 1px solid #ff5d2c;
                      border-radius: 4px;
                      padding: 2px 4px;
                      font-size: 12px;
                      margin-left: 10px;
                      color: brown;
                    }
                    strong {
                      font-size: 1.2rem;
                    }
                  }
                  .comment-o-b {
                    margin-top: 10px;
                    margin-bottom: 10px;
                    color: #9e9b9b;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .label-c {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      .time {
                        font-size: 12px;
                      }
                      span:nth-child(2) {
                        margin-left: 10px;
                      }
                      .reply-txt {
                        padding: 2px 10px;
                        border: 1px solid #504e4e;
                        background: #504e4e;
                        border-radius: 72px;
                        color: #fff;
                        font-size: 12px;
                        margin-left: 10px;
                      }
                    }
                    .operate-i {
                      width: 20%;
                      display: flex;
                      justify-content: space-between;
                    }
                  }

                  .comment-children-b {
                    .c-c-b-1 {
                      display: flex;
                      align-items: center;
                      padding-bottom: 20px;
                      .aside {
                        img {
                          width: 30px;
                          height: 30px;
                          border-radius: 50%;
                        }
                        display: flex;
                        align-items: flex-end;
                        align-self: end
                      }
                      .comment-b1 {
                        width: 100%;
                        .username {
                          display: flex;
                          align-items: center;
                          .author-txt,
                          .floorOwner-txt {
                            border: 1px solid #ff5d2c;
                            border-radius: 4px;
                            padding: 2px 4px;
                            font-size: 12px;
                            margin-left: 10px;
                            color: brown;
                          }
                          .floorOwner-txt{
                            border-color: #f86f45;
                            color: rgb(161, 86, 86)
                          }
                          .thumb-up{
                            position: absolute;
                            right: 10px;
                            color: #9e9b9b
                          }
                        }
                        .comment {
                          margin-top: 10px;
                          width: 100%;
                          display: flex;
                          justify-content: space-between;
                          .commentTxt{
                            word-break: break-all;
                            width: 90%
                          }
                          span {
                            color: #9e9b9b;
                          }
                        }
                      }
                    }
                  }
                }
              }
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
<style >
.cube-dialog-content-def > p {
  word-break: break-all;
}
</style>



