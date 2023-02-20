import axios from '../http'
import Qs from 'qs'

export default {
  sendQuestions (params, callback, errorCallback) {
    let self = this
    axios.post(process.env.CUSTOM_CONFIG.API_BASE_URL, Qs.stringify(params)).then(function (response) {
      self.dealResponse(response, callback, errorCallback)
    })
  }
}
