<!--
 * @Description: file content
 * @Author: chenchen
 * @Date: 2019-05-05 19:46:06
 * @LastEditTime: 2019-05-30 00:02:21
 -->
<template>
  <div
    class="cube-page"
  >
    <section class="wrapper">
      <main class="content">
        <slot name="content">{{content}}</slot>
      </main>
    </section>
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

</style>