<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-05 19:46:06
 * @LastEditTime: 2019-05-07 12:03:39
 -->
<template>
  <div
    class="cube-page"
    :class="type"
  >
    <header>
      <slot name="header"></slot>
    </header>
    <section class="wrapper">
      <main class="content">
        <slot name="content">{{content}}</slot>
      </main>
    </section>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    type: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
//   @import "~@/common/stylus/variable.styl"
$color-white: "#fff";
$color-dark-grey: "#eee";
$fontsize-large: "16px";
$fontsize-medium: "14px";
$radius-size-medium: "4px";
$color-light-grey-opacity: "rgba(0,0,0,.1)";
$color-active-light-gray: "rgba(0,0,0,.6)";
$color-orange: "orange";

.cube-page {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #efeff4;
  overflow: hidden;
  .header {
    position: relative;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 6px #ccc;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 5;
    h1 {
      font-size: 16px;
      font-weight: 700;
      .cubeic-back {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 15px;
        color: #fc9153;
      }
    }
  }
  > .wrapper {
    // height: calc(100% - 88px);
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    // -webkit-overflow-scrolling: touch;
      .content {
        height: 100%;
      }
   
  }
  &.option-demo {
    .wrapper {
      background-color: $color-white;
    }
    .title {
      font-size: $fontsize-large;
      font-weight: 500;
      color: $color-dark-grey;
      padding: 15px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      margin-bottom: 15px;
    }
    .options {
      margin-bottom: 15px;
    }
    .option-list {
      .group {
        margin-bottom: 15px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: $radius-size-medium;
      }
      .item {
        height: 52px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        &.sub {
          font-size: $fontsize-medium;
          background-color: $color-light-grey-opacity;
          &.first {
            box-shadow: 0 1px 1px 1px #eee inset;
          }
          &.last {
            border-bottom: none;
          }
        }
        .demo {
          margin-bottom: 15px;
        }
        .methods {
          .method-list {
            .group {
              margin-bottom: 15px;
              border: 1px solid rgba(0, 0, 0, 0.1);
              border-radius: $radius-size-medium;
            }
            .item {
              button {
                height: 40px;
                font-size: $fontsize-large;
              }
              .item {
                background-color: $color-active-light-gray;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
              }
              button {
                width: 100%;
                border-bottom-left-radius: $radius-size-medium;
                border-bottom-right-radius: $radius-size-medium;
                background-color: $color-orange;
                box-shadow: 0 0 0 1px $color-orange;
                border: none;
                outline: none;
                color: $color-white;
              }
            }
          }
        }
      }
    }
  }
}
</style>