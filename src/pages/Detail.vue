<template>
  <van-skeleton v-if="!newsInfo" title :row="5" />
  <div v-else class="content" v-html="newsInfo.body"></div>
  <div class="nav-box">
    <van-icon name="arrow-left" @click="handle" />
    <van-icon name="comment-o" :badge="comments" />
    <van-icon name="good-job-o" :badge="popularity" />
    <van-icon name="star-o" color="#1989fa" />
    <van-icon name="share-o" color="#ccc" />
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  onBeforeMount,
  onBeforeUnmount,
  onUpdated,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { queryNewsInfo, queryNewsStory } from '../api'

export default {
  name: 'Detail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    let state = reactive({
      comments: 0,
      popularity: 0,
      newsInfo: null,
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

    return {
      ...toRefs(state),
      handle,
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
