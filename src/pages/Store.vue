<template>
  <Nav title="收藏列表" />
  <div>
    <van-swipe-cell>
      <div class="con">
        <Item :data="{ title: '你好呀李银河', images: ['https://pic3.zhimg.com/v2-c735ebbe5594af22913fdd24e8eea2d6.jpg?source=8673f162'], hint: 'Astro · 2分钟阅读' }" />
      </div>
      <template #right>
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import Nav from '../components/Nav.vue'
import Item from '../components/Item.vue'
export default {
  name: 'Store',
  components: {
    Nav,
    Item,
  },
}
</script>

<style lang="less" scoped>
.van-swipe-cell {
  .con {
    padding: 0 15px;
  }
  :deep(.van-swipe-cell__right) {
    .van-button {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
