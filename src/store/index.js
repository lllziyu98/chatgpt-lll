import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      id: '',
      token: '',
      name: '',
      role: '',
      times: 900
    },
    questionId: ''
  },
  mutations: {
    setUser (state, user) {
      state.user.id = user.id || ''
      state.user.name = user.name || ''
      state.user.token = user.token || ''
      state.user.role = user.role || ''
      state.user.times = user.times || 0
    },
    setQuestionId(state, id) {
      state.questionId = id
    }
  }
})

export default store
