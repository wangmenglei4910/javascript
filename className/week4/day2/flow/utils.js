window._utils = (() => {
  /**
   * 作用：将类数组转化为数组
   * @param likeAry(类数组)
   * @return 转换后数组
   */
  function likeAryTo(likeAry) {
    try {
      return [].slice.call(likeAry) // Array.from(likeAry)
    } catch (e) {
      let arr = []
      for (let i = 0; i < likeAry.length; i++) {
        arr[arr.length] = likeAry[i]
      }
      return arr
    }
  }

  /**
   * 作用：将json字符串转换为json对象
   * @param data
   * @return JSON对象
   */
  function toJSON(data) {
    return 'JSON' in window ? JSON.parse(data) : eval(`(${data})`)
  }

  /**
   * 作用：获取、设置浏览器窗口的盒模型属性
   * @param attr
   * @param val
   */
  function win(attr, val) {
    if (typeof val === 'undefined') {
      return document.documentElement[attr] || document.body[attr]
    }
    document.documentElement[attr] = document.body[attr] = val
  }

  /**
   * 作用：获取当前元素距离body 左偏移和上偏移
   * @param ele
   * @return {left, top}
   */
  const offset = ele => {
    let left = ele.offsetLeft
    let top = ele.offsetTop
    let parent = ele.offsetParent
    while (parent && parent.nodeName.toLowerCase() !== 'body') {
      left += parent.offsetLeft + parent.clientLeft
      top += parent.offsetTop + parent.clientTop
      parent = parent.offsetParent
    }
    return {
      left,
      top
    }
  }

  /**
   * 作用：获取元素样式
   * @param ele 元素对象
   * @param attr 样式属性（'width'）
   */
  function getCss(ele, attr) {
    var value = ''
    if (window.getComputedStyle) {
      value = window.getComputedStyle(ele, null)[attr]
    } else { // IE 6 - 8
      if (attr === 'opacity') {
        // 'alpha(opacity=10)'
        var op = ele.currentStyle.filter
        var reg = /alpha\(opacity=(.+)\)/
        value = reg.test(op) ? reg.exec(op)[1] / 100 : 1
      } else {
        value = ele.currentStyle[attr]
      }
    }

    // 去单位处理 '10px' '0.3'
    var reg = /^[-+]?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem)?/

    // if (reg.test(value)) {
    //   value = parseFloat(value)
    // }
    reg.test(value) && (value = parseFloat(value))

    return value
  }

  /**
   * 作用 设置css样式
   * @param {Object} ele 元素对象
   * @param {String} attr 样式名
   * @param {Number|String} value 样式值
   */
  function setCss(ele, attr, value) {
    if (attr === 'opacity') {
      ele.style.opacity = value
      ele.style.filter = 'alpha(opacity=' + value * 100 + ')'
      return
    }

    // 自动加单位 width height margin padding left right top bottom
    var reg = /^(width|height|((margin|padding)?(top|left|right|bottom)?))$/i
    if (reg.test(attr)) {
      // !isNaN(value) => true 是有效数字 需要加单位
      !isNaN(value) && (value += 'px')
    }
    ele.style[attr] = value
  }

  /**
   * 批量设置样式
   * @param {object} ele 元素对象
   * @param {object} obj 样式属性对象
   */
  function setCssBatch(ele, obj) {
    if (typeof obj !== 'object') return

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        setCss(ele, key, obj[key])
      }
    }
  }

  /**
   *
   * @param {object} ele 元素对象
   * @param {string|object} param
   * @param {any} val
   */
  function css(ele, param, val) {
    if (typeof param === 'object') {
      setCssBatch(ele, param)
      return
    }

    if (typeof param === 'string' && typeof val === 'undefined') {
      return getCss(ele, param)
    }

    if (typeof val !== 'undefined') {
      setCss(ele, param, val)
    }
  }

  return {
    likeAryTo, // likeAryTo: likeAryTo
    toJSON,
    win,
    offset,
    getCss,
    setCss,
    setCssBatch,
    css
  }

})()
