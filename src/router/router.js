import Vue from 'vue'
import Router from 'vue-router'
import api from '@/api/api'
import Index from './modules/index'
import Login from './modules/login'
import Register from './modules/register'
import Person from './modules/person'
import store from '../store/index'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    ...Index,
    ...Person,
    ...Login,
    ...Register
  ]
})

let tokenCheckInterval
let activeInterval = function () {
  tokenCheckInterval = setInterval(() => {
    let loginToken = sessionStorage.getItem('login-token') || store.state.user.sso
    api.loginByToken(loginToken, function () {
      console.log('token-is-true')
    }, function (doLogin, e) {
      clearInterval(tokenCheckInterval)
      api.doLogout()
    })
  }, 30000)
}
//
// router.beforeEach((to, from, next) => {
//   // 判断该路由是否需要登录权限
//   let logged = sessionStorage.getItem('logged')
//   clearInterval(tokenCheckInterval)
//   if (to.matched.some(record => record.meta.noNeedLogin === true)) {
//     next()
//   } else {
//     activeInterval()
//     let loginToken = sessionStorage.getItem('login-token')
//     if (logged === 'true') {
//       next()
//     } else if (to.query.token && to.query.token !== '') {
//       api.loginByToken(to.query.token, function () {
//         next()
//       }, function (doLogin, e) {
//         api.doLogout()
//       })
//     } else if (loginToken && loginToken !== '') {
//       api.loginByToken(loginToken, function () {
//         next()
//       }, function (doLogin, e) {
//         api.doLogout()
//       })
//     } else {
//       next('/login')
//     }
//   }
// })

export default router
