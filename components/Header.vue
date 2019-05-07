<!--
 * @Description: 头部容器
 * @Author: chenchen
 * @Date: 2019-05-03 21:57:58
 * @LastEditTime: 2019-05-07 11:56:50
 -->
<template>
  <div class="header">
    <section class="left-b">
      <slot name="left"></slot>
    </section>
    <section class="center-b">
      <slot></slot>
    </section>
    <section class="right-b">
      <slot name="right"></slot>
    </section>

  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.header {
  height: 50px;
  width: 100vw;
  background: rgb(248, 152, 26);
  
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  .center-b{
    height: 100%;
    width: 70%;
     display: flex;
      justify-content: center;
      align-items: center;
  }
  .left-b,.right-b{
      width: 15%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .left-b{
    //  background: red
  }
  .right-b{
    //   background: rebeccapurple;
  }
}
</style>


