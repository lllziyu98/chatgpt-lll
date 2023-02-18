<template>
  <div class="chatgpt-register">
    <h1>ChatGPT</h1>
    <div class="form-bg">
      <el-form label-position="right" label-width="80px" :model="entity" ref="resgister-form" :rules="rules">
        <el-form-item label="用户名" prop="user">
          <el-input v-model.trim="entity.user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psd">
          <el-input v-model.trim="entity.psd" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button type="primary" class="login-btn" :loading="loading" @click="goResgister">点击注册</el-button>
        <div class="link-text-bg">
          <router-link to="/login" class="link-text">去注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data () {
    let checkUser = (rule, value, callback) => {
      if (this.entity.user === '') {
        callback(new Error('请输入用户名'))
      } else if (!(/^[a-zA-Z0-9\s]+$/.test(this.entity.user))) {
        callback(new Error('用户名格式不正确'))
      } else if (this.entity.user.length < 3 || this.entity.user.length > 16) {
        callback(new Error('用户名格式不正确，长度位3-16位'))
      } else {
        callback()
      }
    }

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
        user: '',
        psd: ''
      },
      rules: {
        user: [
          {required: true, validator: checkUser, trigger: 'blur'}
        ],
        psd: [
          {required: true, validator: checkPsd, trigger: 'blur'}
        ]
      }
    }
  },
  beforeMount () {
  },
  methods: {
    goResgister () {
      let self = this
      this.$refs['resgister-form'].validate((valid) => {
        if (valid) {
          self.loading = true
          // let formData = new FormData()
          // formData.append('email', self.entity.email)
          console.log()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chatgpt-register {
  min-height: 100%;
  padding: 0 20px;

  > h1 {
    margin-top: 10vh;
    text-align: center;
    font-size: 48px;
    font-weight: 600;
    line-height: 1.2;
    color: #303133;;
  }

  .form-bg {
    margin: 80px auto 0;
    width: 100%;
    max-width: 550px;

    .login-btn {
      margin: 20px 0 0;
      text-align: center;

      .link-text-bg {
        margin: 10px 0 0;

        .link-text {
          font-size: 14px;
          line-height: 1.2;
          text-decoration: none;
          color: #409EFF;
        }
      }
    }
  }
}
</style>
