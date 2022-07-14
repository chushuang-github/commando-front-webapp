<template>
  <div class="news-item">
    <router-link :to="`/detail/${data.id}`">
      <div class="img-box">
        <img v-if="data.images && data.images.length" v-lazy="data.images[0]" alt="" />
      </div>
      <h4 class="title">{{ data.title }}</h4>
      <p class="desc">{{ data.hint }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.news-item {
  position: relative;
  padding: 15px 0px;
  height: 95px;
  overflow: hidden;
  box-sizing: border-box;
  a {
    display: block;
    .img-box {
      position: absolute;
      right: 0;
      top: 15px;
      background: #f4f4f4;
      width: 65px;
      height: 65px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .title {
      max-height: 50px;
      line-height: 25px;
      font-size: 16px;
      color: #000;
      margin-right: 75px;
      // 超过两行，使用省略号
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .desc {
      line-height: 15px;
      font-size: 12px;
      color: #999;
      margin-right: 75px;
    }
  }
}
</style>
