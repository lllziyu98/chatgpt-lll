<template>
  <div class="chatgpt-register">
    <h1>ChatGPT</h1>
    <div class="form-bg">
      <el-form label-position="right" label-width="80px" :model="entity" ref="resgister-form" :rules="rules">
        <el-form-item label="用户名" prop="user">
          <el-input v-model.trim="entity.user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model.trim="entity.email" placeholder="请输入Email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psd">
          <el-input type="password" v-model.trim="entity.psd" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="psd2">
          <el-input type="password" v-model.trim="entity.psd2" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <Verify @success="codeCheck(true)" @error="codeCheck(false)" :type="3" :vOffset="5" :barSize="{width: '100%', height: '40px'}"></Verify>
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button type="primary" class="login-btn" :loading="loading" @click="goRegister">点击注册</el-button>
        <div class="link-text-bg">
          <router-link to="/login" class="link-text">去登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Verify from 'vue2-verify'
  import Api from '@/api/api'
  import utils from '@/util/utils'

  export default {
    name: 'register',
    components: {
      Verify
    },
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

      let checkEmail = (rule, value, callback) => {
        let regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (this.entity.email === '') {
          callback(new Error('请输入Email'))
        } else if (!regx.test(value)) {
          callback(new Error('Email格式不正确'))
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

      let checkPsd2 = (rule, value, callback) => {
        if (this.entity.psd === '') {
          callback(new Error('请确认密码'))
        } else if (this.entity.psd !== this.entity.psd2) {
          callback(new Error('两次输入的密码不相同，请确认密码！'))
        } else {
          callback()
        }
      }

      let checkCode = (rule, value, callback) => {
        if (this.code === true) {
          callback()
        } else {
          callback(new Error('请向右滑动完成验证'))
        }
      }
      return {
        loading: false,
        entity: {
          user: '',
          email: '',
          psd: '',
          psd2: ''
        },
        code: false,
        rules: {
          user: [
            {required: true, validator: checkUser, trigger: 'blur'}
          ],
          email: [
            {required: true, validator: checkEmail, trigger: 'blur'}
          ],
          psd: [
            {required: true, validator: checkPsd, trigger: 'blur'}
          ],
          psd2: [
            {required: true, validator: checkPsd2, trigger: 'blur'}
          ],
          code: [
            {required: true, validator: checkCode, trigger: 'change'}
          ]
        }
      }
    },
    beforeMount () {
      this.utils = utils
      this.checkLogin()
    },
    methods: {
      checkLogin () {
        let self = this
        Api.checkLogin((data) => {
          self.$store.commit('setUser', {name: data.data.slice(8), role: '0', times: '---', token: self.utils.getCookie('token')})
          self.$router.push('/index')
        }, (error) => {
          self.$store.commit('setUser', {})
          console.log('checkLogin-error', error)
        })
      },
      goRegister () {
        let self = this
        this.$refs['resgister-form'].validate((valid) => {
          if (valid) {
            self.loading = true
            let params = {
              username: self.entity.user,
              email: self.entity.email,
              password: self.entity.psd
            }
            Api.register(params, (data) => {
              self.loading = false
              self.$message({
                message: '注册成功',
                type: 'success'
              })
              self.$router.push('/login')
            }, () => {
              self.loading = false
              self.$message({
                message: '注册失败',
                type: 'error'
              })
            })
          }
        })
      },
      codeCheck (success) {
        this.code = success
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

  /deep/ .el-form-item__content {
    .verify-btn {
      display: none;
    }
  }
}
</style>
