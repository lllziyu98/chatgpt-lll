import User from './modules/user'

export default {
  ...User,
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
