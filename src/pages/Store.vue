<template>
  <Nav title="收藏列表" />
  <van-empty v-if="storeList.length === 0" description="暂无收藏" />
  <div v-else>
    <van-swipe-cell v-for="item in storeList" :key="item.id">
      <div class="con">
        <Item :data="{ ...item.news, images: [item.news.image], hint: '' }" />
      </div>
      <template #right>
        <van-button
          square
          type="danger"
          text="删除"
          @click="removeHandle(item.id)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import Nav from '../components/Nav.vue'
import Item from '../components/Item.vue'
import { Toast } from 'vant'
import { storeRemove } from '../api'

export default {
  name: 'Store',
  components: {
    Nav,
    Item,
  },
  setup() {
    let store = useStore()
    let storeList = computed(() => {
      return store.state.storeList || []
    })

    onBeforeMount(() => {
      if (store.state.storeList === null) {
        store.dispatch('changeStoreListAsync')
      }
    })

    // 删除新闻列表
    const removeHandle = async (id) => {
      let { code } = await storeRemove(id)
      if (code !== 0) {
        return Toast('删除新闻列表失败')
      }
      Toast('删除新闻列表成功')
      store.commit('removeStoreList', id)
    }

    return {
      storeList,
      removeHandle,
    }
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
