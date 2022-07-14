<template>
  <!-- router-view使用插槽的获取匹配到的路由组件 -->
  <!-- 传入keep-alive组件和component动态组件方式实现路由组件缓存 -->
  <router-view v-slot="{ Component }">
    <!-- 只缓存组件名为Home的组件(通过组件内部的name属性定义的组件名) -->
    <keep-alive include="Home">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
html,
body {
  min-height: 100%;
  overflow-x: hidden;
  background: #f4f4f4;
}
// 移动端app大小最大宽度为750px，屏幕超过750px，移动端app居中展示
#app {
  background: #ffffff;
  margin: 0 auto;
}
</style>
