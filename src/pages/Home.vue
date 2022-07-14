<template>
  <!-- 头部 -->
  <Head :time="today" />
  <!-- 轮播图 -->
  <section class="banner-box">
    <van-swipe v-if="bannerList.length" :autoplay="4000" lazy-render>
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <router-link :to="`/detail/${item.id}`" class="content">
          <img :src="item.image" alt="" />
          <div class="mark">
            <h3 class="title">{{ item.title }}</h3>
            <span class="tip">{{ item.hint }}</span>
          </div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </section>
  <!-- 新闻列表 -->
  <van-skeleton v-if="!newsList.length" title :row="5" />
  <div v-else>
    <section class="news-box" v-for="(item, index) in newsList" :key="index">
      <van-divider v-if="index" content-position="left">
        {{ formatTime(item.date, '{1}月{2}日') }}
      </van-divider>
      <div class="content">
        <Item v-for="sub in item.stories" :key="sub.id" :data="sub" />
      </div>
    </section>
  </div>
  <div ref="loadMore" class="lazy-more" v-show="newsList.length">
    <van-loading size="12px">小主，精彩数据准备中...</van-loading>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import Head from '../components/Head.vue'
import Item from '../components/Item.vue'
import { queryNewsLatest, queryNewsBefore } from '../api'
import { formatTime } from '../assets/utils'

export default {
  name: 'Home',
  components: {
    Head,
    Item,
  },
  setup() {
    let state = reactive({
      today: '',
      newsList: [],
      bannerList: [],
    })
    // 获取数据
    onBeforeMount(async () => {
      let { date, stories, top_stories } = await queryNewsLatest()
      state.today = date
      // vue2和vue3，一旦数据被冻结，就不进行响应式劫持/代理数据
      // state.newsList依然是做代理的，但是state.newsList里面的每一项数据(对象)不进行代理
      state.newsList.push(Object.freeze({ date, stories }))
      // bannerList轮播图数据不会修改，加上Object.freeze冻结就不会对数据进行响应式代理
      // 冻结的元素，不去做代理
      state.bannerList = Object.freeze(top_stories)
    })

    // 上拉加载更多逻辑
    let loadMore = ref(null)
    onMounted(() => {
      let ob = new IntersectionObserver(async ([{ isIntersecting }]) => {
        if (isIntersecting) {
          // dom元素进入可视区域，调用接口加载更多数据
          let time = state.newsList[state.newsList.length - 1].date
          let { date, stories } = await queryNewsBefore(time)
          state.newsList.push(Object.freeze({ date, stories }))
        }
      }, { threshold: 0 })
      ob.observe(loadMore.value)
    })

    return {
      ...toRefs(state),
      formatTime,
      loadMore,
    }
  },
}
</script>

<style lang="less" scoped>
.banner-box {
  box-sizing: border-box;
  height: 375px;
  background: #f4f4f4;
  .van-swipe {
    height: 100%;
    background: #ffffff;
    :deep(.van-swipe__indicators) {
      left: auto;
      right: 15px;
      transform: none;
      .van-swipe__indicator--active {
        width: 15px;
        border-radius: 3px;
        --van-swipe-indicator-active-background-color: #fff;
      }
    }
    .content {
      position: relative;
      display: block;
      height: 100%;
      color: #fff;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      .mark {
        position: absolute;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        height: 110px;
        background: rgba(0, 0, 0, 0.3);
        background: -webkit-linear-gradient(
          top,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.5)
        );
        padding: 10px 20px;
        .title {
          padding-top: 10px;
          font-size: 20px;
          line-height: 25px;
          max-height: 50px;
          // 超过两行，使用省略号
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .tip {
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
  }
}
.news-box {
  .van-divider {
    margin: 5px 0px;
    font-size: 12px;
    &::before {
      display: none;
    }
  }
  padding: 0px 15px;
}
.van-skeleton {
  padding: 30px 15px;
}
.lazy-more {
  display: flex;
  justify-content: center;
  padding: 10px 0px;
  background: #f4f4f4;
}
</style>
