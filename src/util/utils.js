export default {
  getUrlKey(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ['', ''])[1].replace(/\+/g, '%20')) || null
  },
  openUrlInNewTab(url) {
    let tag = document.createElement('a')
    tag.href = url
    tag.target = '_blank'
    let event = document.createEvent('MouseEvents')
    event.initEvent('click', true, true)
    tag.dispatchEvent(event)
  },
  debounce(fn, wait) {
    let timeout
    return function () {
      let self = this
      let args = arguments
      clearTimeout(timeout)
      timeout = setTimeout(function () {
        fn.apply(self, args)
      }, wait)
    }
  },
  clone(source, n) {
    let target
    if (source === null || typeof source !== 'object') {
      target = source
    } else if (source instanceof Date) {
      (target = new Date()).setTime(source.getTime())
    } else if (source instanceof Array) {
      target = []
      for (let s = 0, length = source.length; s < length; s++) {
        target[s] = this.clone(source[s])
      }
    } else if (source instanceof Object) {
      target = {}
      for (let r in source) {
        if (!n || n.includes(r)) {
          target[r] = this.clone(source[r])
        }
      }
    } else {
      console.warn("Unable to copy obj! Its type isn't supported.")
    }
    return target
  }
}
