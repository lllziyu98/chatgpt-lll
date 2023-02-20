import User from './modules/user'
import Index from './modules/index'

export default {
  ...User,
  ...Index,
  // ------------------------------
  // ------------Other------------
  // ------------------------------
  dealResponse (response, callback, errorCallback) {
    if (response.data.success === true) {
      if (callback && typeof callback === 'function') {
        callback(response.data.data, response.data.code, response.data.page)
      }
    } else {
      if (errorCallback && typeof errorCallback === 'function') {
        errorCallback(response.data.code)
      }
    }
  }
}
