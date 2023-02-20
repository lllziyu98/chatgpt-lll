import axios from '../http'

export default {
  sendQuestions (formData, callback, errorCallback) {
    let self = this
    axios.post(process.env.CUSTOM_CONFIG.API_BASE_URL, formData).then(function (response) {
      self.dealResponse(response, callback, errorCallback)
    })
  }
}
