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

  return {
    likeAryTo, // likeAryTo: likeAryTo
    toJSON,
    win,
    offset
  }

})()
