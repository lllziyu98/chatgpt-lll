import axios from '../http'
import store from '@/store'
import utils from '@/util/utils'
import router from '@/router/router'
import Qs from 'qs'

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
      self.dealResponse(response, callback, errorCallback)
    }).catch(() => {
      self.dealResponse(null, callback, errorCallback)
    })
  },
  doLogout (url) {
    sessionStorage.removeItem('store')
    store.commit('setUser', {})
    // 请求接口
    router.push('/login')
  },
  checkLogin (callback, errorCallback) {
    let self = this
    axios.get(process.env.CUSTOM_CONFIG.API_BASE_URL + '/islogin?_v=' + parseInt(new Date().getTime() / 1000)).then(function (response) {
      let res = {
        status: 200,
        data: {
          data: response.data
        }
      }
      self.dealResponse(res, callback, errorCallback)
    }).catch(function (e) {
      if (errorCallback && typeof errorCallback === 'function') {
        errorCallback(false, e)
      }
    })
  }
}
