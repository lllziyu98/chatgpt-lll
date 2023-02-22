import axios from '../http'
let socketRequest = {
  domain: 'ws://192.9.224.130:23856'
}
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
  },
  sendSocketQuestions (params, callback, errorCallback) {
    let self = this
    let ws = new WebSocket(socketRequest.domain + '/socket')
    ws.onopen = (evt) => {
      console.log('连接成功')
      ws.send(JSON.stringify(params))
    }

    ws.onmessage = (evt) => {
      let res = JSON.parse(evt.data)
      // console.log('res', res)
      if (res.event === 'token') {
        let response = {
          status: 200,
          data: {
            type: 'text',
            data: res.data
          }
        }
        self.dealResponse(response, callback, errorCallback)
      }
      if (res.event === 'result') {
        let response = {
          status: 200,
          data: {
            type: 'result',
            data: res.data
          }
        }
        self.dealResponse(response, callback, errorCallback)
      }
      if (res.event === 'error') {
        self.dealResponse(null, callback, errorCallback)
      }
    }
    ws.onclose = (evt) => {
      console.log('关闭')
    }
    ws.onerror = (evt) => {
      console.log('错误')
      self.dealResponse(null, callback, errorCallback)
    }
  }
}
