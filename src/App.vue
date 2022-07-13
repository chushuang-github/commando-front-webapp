<template>
  <router-view></router-view>
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
