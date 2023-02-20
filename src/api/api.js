import User from './modules/user'
import Index from './modules/index'

export default {
  ...User,
  ...Index,
  // ------------------------------
  // ------------Other------------
  // ------------------------------
  dealResponse (response, callback, errorCallback) {
    if (response && response.status === 200) {
      if (callback && typeof callback === 'function') {
        callback(response.data)
      }
    } else {
      if (errorCallback && typeof errorCallback === 'function') {
        errorCallback()
      }
    }
  }
}
