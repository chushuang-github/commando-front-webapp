<template>
  <Nav title="个人中心" />
  <div class="base-info" v-if="info">
    <img
      :src="info.pic"
      @click="$router.push('/updateperson')"
      alt=""
    />
    <p>{{ info.name }}</p>
  </div>
  <van-cell-group>
    <van-cell title="我的收藏" is-link to="/store" />
    <van-cell title="退出登录" @click="logout" />
  </van-cell-group>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Nav from '../components/Nav.vue'
import { Toast } from 'vant'

export default {
  name: 'Person',
  components: {
    Nav,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    // 基本信息
    onBeforeMount(() => {
      let { isLogin, info } =  store.state
      if (isLogin === null) store.dispatch('changeIsLoginAsync')
      if (info === null) store.dispatch('changeInfoAsync')
    })
    let info = computed(() => {
      let { isLogin, info } =  store.state
      if (isLogin && info) return info
      return null
    })

    // 退出登录
    const logout = () => {
      Toast('退出登录')
      localStorage.removeItem('token')
      store.commit('changeIsLogin', null)
      store.commit('changeInfo', null)
      router.replace('/login')
    }

    return {
      logout,
      info
    }
  },
}
</script>

<style lang="less" scoped>
.base-info {
  box-sizing: border-box;
  margin: 20px 0;

  img {
    display: block;
    margin: 0 auto;
    width: 86px;
    height: 86px;
    border-radius: 50%;
  }

  p {
    line-height: 50px;
    font-size: 18px;
    text-align: center;
  }
}
</style>
