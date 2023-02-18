import axios from 'axios'

axios.defaults.withCredentials = true

axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  if (response.data.success === false && response.data.code === '401') {
    sessionStorage.removeItem('logged')
    sessionStorage.removeItem('login-token')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default axios
