<template>
  <Nav />
  <van-form ref="formBox" @submit="submit">
    <van-cell-group inset>
      <van-field
        v-model="phone"
        label="手机号"
        placeholder="请输入手机号"
        label-width="50px"
        name="phone"
        :rules="[
          { required: true, message: '手机号不能为空' },
          { pattern: regPhone, message: '手机号格式不正确' },
        ]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            class="form-btn"
            :disabled="!enable"
            @click="sendCode"
          >
            {{ enable ? '发送验证码' : time }}
          </van-button>
        </template>
      </van-field>

      <van-field
        v-model="code"
        label="验证码"
        placeholder="请输入验证码"
        label-width="50px"
        :rules="[
          { required: true, message: '验证码不能为空' },
          { pattern: regCode, message: '验证码必须为6位数字' },
        ]"
      />
    </van-cell-group>

    <div style="margin: 5px 30px">
      <van-button round block type="primary" native-type="submit">
        立即登录/注册
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { Toast } from 'vant'
import { login, phoneCode } from '../api'
import Nav from '../components/Nav.vue'

export default {
  name: 'Login',
  components: {
    Nav,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const formBox = ref(null)

    const state = reactive({
      phone: '15905560621',
      code: '',
      enable: true,
      time: '60s'
    })
        
    // 发送短信验证码
    const sendCode = () => {
      formBox.value.validate('phone').then(async () => {
        const { code } = await phoneCode(state.phone)
        if(code !== 0) {
          return Toast('验证码获取失败')
        }
        state.enable = false
        let n = 60
        state.time = '60s'
        let timer = setInterval(() => {
          n--
          if(n === 0) {
            clearInterval(timer)
            state.enable = true
            return
          }
          state.time = n + 's'
        }, 1000)
      }).catch(() => {})
    }

    const submit = async () => {
      const { code, token } = await login(state.phone, state.code)
      if(code !== 0) {
        // 登录失败
        return Toast('登录失败')
      }
      localStorage.setItem('token', token)
      store.commit('changeIsLogin', true)
      // 获取用户信息
      await store.dispatch('changeInfoAsync')
      Toast('登录成功')
      router.replace(route.query.from || '/person')
    }

    return {
      ...toRefs(state),
      formBox,
      regPhone: /^1\d{10}$/,
      regCode: /^\d{6}$/,
      submit,
      sendCode,
    }
  },
}
</script>

<style lang="less" scoped>
.van-form {
  margin-top: 20px;
  .form-btn {
    width: 78px;
  }
}
.van-cell {
  height: 62px;
}
</style>
