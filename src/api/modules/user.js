import axios from '../http'
import store from '@/store'
import utils from '@/util/utils'
import router from '@/router/router'
import Qs from 'qs'

/**
 * @param userInfoObject user info
 * @param loginToken sso token
 * @param special if enter via special way
 */
function login (userInfoObject, loginToken, special) {
  sessionStorage.removeItem('store')
  sessionStorage.setItem('login-token', loginToken)
  sessionStorage.setItem('logged', 'true')

  store.commit('setUser', {
    id: userInfoObject.data.id,
    sso: loginToken,
    token: userInfoObject.data.token,
    role: userInfoObject.data.role,
    roleName: utils.formatRoleName(userInfoObject.data.role),
    balance: userInfoObject.data.money,
    email: userInfoObject.data.email,
    status: userInfoObject.data.status,
    phone: userInfoObject.data.phone,
    avatar: userInfoObject.data.avatar || ''
  })
}

export default {
  register (params, callback, errorCallback) {
    let self = this
    axios.post(`${process.env.CUSTOM_CONFIG.API_BASE_URL}/register`, Qs.stringify(params), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (response) {
      self.dealResponse(response, callback, errorCallback)
    }).catch(() => {
      self.dealResponse(null, callback, errorCallback)
    })
  },
  login (params, callback, errorCallback) {
    let self = this
    axios.post(`${process.env.CUSTOM_CONFIG.API_BASE_URL}/login`, Qs.stringify(params), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (response) {
      console.log('response', response)
      console.log('Set-Cookie', response.headers['set-cookie'], response.headers.cookie)
      self.dealResponse(response, callback, errorCallback)
    }).catch(() => {
      self.dealResponse(null, callback, errorCallback)
    })
  },
  doLogout (url) {
    sessionStorage.removeItem('login-token')
    sessionStorage.removeItem('logged')
    sessionStorage.removeItem('store')
    store.commit('setUser', {})
    // 请求接口
    router.push('/login')
  },
  loginByToken (loginToken, callback, errorCallback) {
    axios.get(process.env.CUSTOM_CONFIG.API_BASE_URL + '/login/token/' + loginToken + '?_v=' + parseInt(new Date().getTime() / 1000)).then(function (response) {
      if (response.data.success === true) {
        login(response.data, loginToken)

        if (callback && typeof callback === 'function') {
          callback(response.data, loginToken)
        }
      } else if (response.data.success === false) {
        if (errorCallback && typeof errorCallback === 'function') {
          errorCallback(true, null)
        }
      } else {
        if (errorCallback && typeof errorCallback === 'function') {
          errorCallback(false, null)
        }
      }
    }).catch(function (e) {
      if (errorCallback && typeof errorCallback === 'function') {
        errorCallback(false, e)
      }
    })
  }
}
