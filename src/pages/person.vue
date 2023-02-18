<template>
  <div class="chat-person">
    <h1 class="person-title">ChatGPT</h1>
    <div class="person-main">
      <div class="person-top lll-flex lll-justify-content-between lll-align-items-center">
        <img src="../../static/image/my.png">
        <i class="fa fa-sign-out"></i>
      </div>
      <el-form label-position="right" label-width="120px" :model="entity" ref="login-form" :rules="rules">
        <el-form-item label="用户名">
          {{ $store.state.user.name }}
        </el-form-item>
        <el-form-item label="用户名">
          {{ $store.state.user.role === '0' ? '非会员' : '会员' }}
        </el-form-item>
        <el-form-item label="剩余查询次数">
          {{ $store.state.user.times }}
        </el-form-item>
        <el-form-item label="联系客服">
          vxx: 123321321321321
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "person",
  data () {
    let checkPsd = (rule, value, callback) => {
      if (this.entity.user === '') {
        callback(new Error('请输入密码'))
      } else if (!(/^[a-zA-Z0-9\s]+$/.test(this.entity.user))) {
        callback(new Error('密码格式不正确'))
      } else if (this.entity.user.length < 3 || this.entity.user.length > 9) {
        callback(new Error('密码格式不正确，长度位3-9位'))
      } else {
        callback()
      }
    }

    return {
      loading: false,
      entity: {
        psd: ''
      },
      changePsd: false,
      rules: {
        psd: [
          {required: true, validator: checkPsd, trigger: 'blur'}
        ]
      }
    }
  },
  beforeMount () {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.chat-person {
  min-height: 100vh;
  background-color: rgb(39, 39, 50);
  padding: 20px;

  .person-title {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.2;
    color: #ffffff;
  }

  .person-main {
    margin: 15px auto 0;
    max-width: 800px;
    box-sizing: border-box;
    min-height: 600px;
    border: 1px solid #696969FF;
    border-radius: 5px;
    padding: 10px;

    .person-top {
      > img {
        display: block;
        flex: 0 0 50px;
        width: 0;
        height: 50px;
        border-radius: 50%;
      }

      > i {
        font-size: 30px;
        line-height: 1.2;
        font-weight: 900;
        color: #ffffff;
        cursor: pointer;
      }
    }

    /deep/ .el-form {
      margin: 16px 0 0;

      .el-form-item {
        margin-bottom: 0;
      }

      .el-form-item__label {
        font-size: 15px;
        color: #ffffff;
      }

      .el-form-item__content {
        font-size: 15px;
        color: #fafafa;
      }
    }
  }
}
</style>
