<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-07 09:56:31
 * @LastEditTime: 2019-05-08 09:46:37
 -->
<template>
  <CubePage
    type="scroll-view"
    class="mainpage"
  >

    <!-- <cube-form
      :model="model"
      :schema="schema"
      :immediate-validate="false"
      :options="options"
      @validate="validateHandler"
      @submit="submitHandler"
      @reset="resetHandler"
    > -->

    <template slot="content">

      <header class="account-t">
        账号密码登录
      </header>
      <main class="main-box">
        <section class="loginform-b">
          <div class="loginform">
            <cube-input
              v-model="loginForm.userName"
              clearable
              placeholder="请输入用户名"
            ></cube-input>
          </div>
          <div class="loginform">
            <cube-input
              v-model="loginForm.password"
              clearable
              placeholder="请输入密码"
            ></cube-input>
          </div>
        </section>

        <div class="btn-group">
          <cube-button
            :disabled="!loginForm.password || !loginForm.userName "
            @click="submit"
          >登录</cube-button>
        </div>

        <section class="other-operate">
          <div>注册</div>
          <div>忘记密码</div>
        </section>

        <section class="social-t">
          <div class="line" />
          <div class="social-c">社交账号登录</div>
          <div class="line" />
        </section>

        <section class="social-i-b">
          <div class="wechat-b">
            <img
              src="../assets/img/wechat.png"
              alt=""
            >
            <span>微信</span>
          </div>
          <div class="qq-b">
            <img
              src="../assets/img/qq.png"
              alt=""
            >
            <span>QQ</span>
          </div>
          <div class="weibo-b">
            <img
              src="../assets/img/weibo.png"
              alt=""
            >
            <span>微博</span>
          </div>
        </section>

        <section class="agree-b">
          <cube-checkbox
            class="with-click"
            v-model="loginForm.checked"
            position="left"
            shape="square"
            :hollow-style="true"
          >
            请勾选代表你同意 <a
              href="javascript:;"
              @click.stop="check(0)"
            >用户协议</a> 和 <a
              href="javascript:;"
              @click.stop="check(1)"
            >隐私政策</a>
          </cube-checkbox>
        </section>

      </main>
    </template>
    <!-- </cube-form> -->

  </CubePage>
</template>
<script>
import CubePage from "~/components/CubePage.vue";
import Header from "~/components/Header.vue";
import Quilleditor from "~/components/Quilleditor.vue";
export default {
  components: {
    CubePage,
    Header,
    Quilleditor
  },
  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
        checked: false
      }
    };
  },
  methods: {
    async submit() {
      if (!this.loginForm.checked) {
        const toast = this.$createToast({
         type: 'txt',
          txt: "请勾选协议"
        });
        toast.show();

        return
      }

      await this.$store.dispatch("user/login", this.loginForm);

      console.log(this.$store.state.user.userInfo);

      if (this.$store.state.user.userInfo.success) {
        this.$router.go(-1);
      }else{
         const toast = this.$createToast({
         type: 'txt',
          txt: `${this.$store.state.user.userInfo.errorTxt}`
        });
        toast.show();
      }
    },
    check(e) {
      console.log(222);
    }
  }
};
</script>

<style lang="scss" scoped>
.mainpage {
  .account-t {
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 4%;
    font-size: 1.2rem;
  }
  .main-box {
    padding: 0 6%;
    .loginform-b {
      margin-top: 10%;
      .loginform {
        margin-bottom: 8%;
      }
    }
    .btn-group {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      background: #eee;
      margin-top: 10%;
    }
    .other-operate {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 6%;
      color: rgb(66, 65, 65);
    }

    .social-t {
      color: rgb(10, 10, 10);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 25%;
      margin-left: 10%;
      margin-right: 10%;
      .social-c {
        margin-left: 2%;
        margin-right: 2%;
      }
      .line {
        width: 40px;
        height: 1px;
        background-color: rgb(10, 10, 10);
      }
    }

    .social-i-b {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin-top: 10%;
      .wechat-b,
      .qq-b,
      .weibo-b {
        height: 40px;
        flex: 1;
        img {
          height: inherit;
          margin-right: 10%;
        }
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .qq-b {
        height: 46px;
      }
    }

    .agree-b {
      margin-top: 10%;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;

      .with-click {
        .cube-checkbox-label {
          a {
            position: relative;
            z-index: 1;
          }
        }
      }
    }
  }
}
</style>


