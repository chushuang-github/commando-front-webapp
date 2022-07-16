<template>
  <Nav title="编辑资料" />
  <div class="form-box">
    <van-cell-group inset>
      <van-field v-model="name" label="用户名" label-width="60px" />

      <van-field label="用户头像" label-width="60px">
        <template #input>
          <van-uploader v-model="pic" max-count="1" />
        </template>
      </van-field>
    </van-cell-group>

    <div style="margin: 12px 30px">
      <van-button round block type="primary" @click="submit">
        修改信息
      </van-button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import Nav from '../components/Nav.vue'
import { userUpdate } from '../api'

export default {
  name: 'UpdatePerson',
  components: {
    Nav,
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    let { name } = store.state.info
    let state = reactive({
      name,
      pic: [],
    })

    const submit = async () => {
      let { name, pic } = state
      // 姓名格式校验 \w：字母数字下划线；\u4e00-\u9fa5：表示中文汉字正则
      let reg = /^[\w\u4e00-\u9fa5]+$/
      if (!reg.test(name)) {
        return Toast('用户名格式不正确')
      }
      if (pic.length === 0) {
        return Toast('请选择用户头像')
      }
      const { code, data } = await userUpdate(name, pic[0].file)
      if(code !== 0) {
        return Toast('用户信息修改失败，请稍后再试')
      }
      Toast('信息修改成功')
      store.commit('changeInfo', data)
      router.replace('/person')
    }

    return {
      ...toRefs(state),
      submit,
    }
  },
}
</script>

<style lang="less" scoped>
.form-box {
  margin-top: 30px;
}
</style>
