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

    let name = store.state.info.name
    let url = store.state.info.pic
    let state = reactive({
      name,
      pic: [{ url }],
    })

    const submit = () => {}

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
