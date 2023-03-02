<template>
  <div class="chatgpt-login">
    <h1>ChatGPT</h1>
    <div class="form-bg">
      <el-form label-position="right" label-width="80px" :model="entity" ref="login-form" :rules="rules">
        <el-form-item label="用户名" prop="user">
          <el-input v-model.trim="entity.user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psd">
          <el-input type="password" v-model.trim="entity.psd" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button type="primary" class="login-btn" :loading="loading" @click="goLogin">登录</el-button>
        <div class="link-text-bg">
          <router-link to="/register" class="link-text">去注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/api/api'

  export default {
    name: 'login',
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
        if (this.entity.psd === '') {
          callback(new Error('请输入密码'))
        } else if (!(/^[a-zA-Z0-9\s]+$/.test(this.entity.psd))) {
          callback(new Error('密码格式不正确'))
        } else if (this.entity.psd.length < 3 || this.entity.psd.length > 9) {
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
      goLogin () {
        let self = this
        this.$refs['login-form'].validate((valid) => {
          if (valid) {
            self.loading = true
            let params = {
              username: self.entity.user,
              password: self.entity.psd
            }
            Api.login(params, (data) => {
              self.loading = false
              self.$message({
                message: '登录成功',
                type: 'success'
              })
              self.$router.push('/index')
            }, () => {
              self.loading = false
              self.$message({
                message: '用户名或密码错误',
                type: 'error'
              })
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.chatgpt-login {
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
