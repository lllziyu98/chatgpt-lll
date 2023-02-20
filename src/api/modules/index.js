import axios from '../http'
import Qs from 'qs'

export default {
  sendQuestions (params, callback, errorCallback) {
    let self = this
    axios.post(process.env.CUSTOM_CONFIG.API_BASE_URL, JSON.stringify(params), {
      headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
      self.dealResponse(response, callback, errorCallback)
    }).catch(() => {
      self.dealResponse(null, callback, errorCallback)
    })
  }
}
