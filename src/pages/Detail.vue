<template>
  <van-skeleton v-if="!newsInfo" title :row="5" />
  <div v-else class="content" v-html="newsInfo.body"></div>
  <div class="nav-box">
    <van-icon name="arrow-left" @click="handle" />
    <van-icon name="comment-o" :badge="comments" />
    <van-icon name="good-job-o" :badge="popularity" />
    <van-icon
      name="star-o"
      :color="isStore ? '#1989fa' : '#000000'"
      @click="favor"
    />
    <van-icon name="share-o" color="#cccccc" />
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onUpdated,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { queryNewsInfo, queryNewsStory, store as storeFn } from '../api'

export default {
  name: 'Detail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    let state = reactive({
      comments: 0,
      popularity: 0,
      newsInfo: null,
    })

    // 计算属性返回的是一个ref类型的数据，setup函数里面取ref类型值的需要加上 .value
    // isStore：该新闻是否被收藏了
    let isStore = computed(() => {
      let { isLogin, storeList } = store.state
      if (isLogin) {
        if (storeList === null) storeList = []
        return storeList.some((item) => item.news.id === route.params.id)
      }
      return false
    })

    onBeforeMount(async () => {
      if (store.state.isLogin === null) {
        await store.dispatch('changeIsLoginAsync')
      }
      if (store.state.isLogin) {
        let { info, storeList } = store.state
        if (info === null) store.dispatch('changeInfoAsync')
        if (storeList === null) store.dispatch('changeStoreListAsync')
      }
    })

    onBeforeMount(async () => {
      let id = route.params.id
      let result = await queryNewsInfo(id)
      state.newsInfo = result
      // 动态创建css
      let link = document.createElement('link')
      link.id = 'link'
      link.rel = 'stylesheet'
      link.href = result.css[0]
      document.head.appendChild(link)

      let { comments, popularity } = await queryNewsStory(id)
      state.comments = comments
      state.popularity = popularity
    })

    onUpdated(() => {
      let imgPlaceholder = document.querySelector('.img-place-holder')
      if (imgPlaceholder && !imgPlaceholder.innerHTML.trim()) {
        imgPlaceholder.innerHTML += `<img src="${state.newsInfo.image}" alt="" />`
      }
    })

    onBeforeUnmount(() => {
      // 组件卸载时，移除创建的link标签
      let link = document.getElementById('link')
      if (link) {
        document.head.removeChild(link)
      }
    })

    const handle = () => {
      router.back()
    }

    // 收藏新闻
    const favor = async () => {
      // 如果没有登录，或者已经收藏了该新闻，点击跳转登录
      if (!store.state.isLogin) {
        Toast('小主，请先登录')
        router.push({
          path: '/login',
          query: { from: route.fullPath },
        })
        return
      }
      // 已经收藏，直接结束
      if (isStore.value) return
      const { code } = await storeFn(route.params.id)
      if (code !== 0) {
        return Toast('收藏新闻失败')
      }
      Toast('收藏新闻成功')
      store.dispatch('changeStoreListAsync')
    }

    return {
      ...toRefs(state),
      isStore,
      handle,
      favor,
    }
  },
}
</script>

<style lang="less" scoped>
.content {
  background: #fff;
  padding-bottom: 50px;
  margin: 0;
}
.van-skeleton {
  padding: 30px 15px;
}
.nav-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: #f4f4f4;
  padding: 0px 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  .van-icon:first-child {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      right: -15px;
      top: -10%;
      display: block;
      width: 1px;
      height: 120%;
      background: #d5d5d5;
    }
  }
}
:deep(.van-badge) {
  background: transparent;
  color: #000;
  border: none;
  right: -5px;
}
:deep(.img-place-holder) {
  height: 375px !important;
  overflow: hidden;
  img {
    width: 100%;
    min-height: 100%;
    margin: 0;
    display: block;
  }
}
</style>
