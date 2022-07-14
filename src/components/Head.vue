<template>
  <header class="header-box">
    <div class="left">
      <div class="time">
        <span>{{ timeNow.day }}</span>
        <span>{{ timeNow.month }}</span>
      </div>
      <h1 class="title">知乎日报</h1>
    </div>
    <router-link to="/person" class="link-btn">
      <img :src="pic" alt="" />
    </router-link>
  </header>
</template>

<script>
import { reactive, computed, toRefs } from '@vue/reactivity'
import { formatTime } from '../assets/utils'
import defaultAvatar from '../assets/images/timg.jpg'

export default {
  name: 'Head',
  props: {
    time: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    let state = reactive({
      pic: defaultAvatar,
    })
    let timeNow = computed(() => {
      let time = props.time || null
      let [month, day] = formatTime(time, '{1}-{2}').split('-')
      let area = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ]
      return {
        month: area[month - 1],
        day,
      }
    })

    return {
      ...toRefs(state),
      timeNow,
    }
  },
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .time {
      padding-right: 15px;
      border-right: 1px solid #ddd;
      span {
        display: block;
        height: 20px;
        line-height: 20px;
        font-size: 20px;
        text-align: center;
        &:nth-child(2) {
          height: 15px;
          line-height: 15px;
          font-size: 12px;
        }
      }
    }
    .title {
      font-size: 22px;
      padding-left: 10px;
    }
  }
  .link-btn {
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 50px;
    }
  }
}
</style>
