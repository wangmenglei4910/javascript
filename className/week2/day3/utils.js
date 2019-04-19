
window._utils = (function(){

  // likeToArray 将类数组转化为数组（兼容方法）
  function likeToArray(args) {
    try {
      return [].slice.call(args)
    } catch(e) {
      var arr = []
      for (var i = 0; i < args.length; i++) {
        arr.push(args[i])
      }
      return arr
    }
  }

  // Array.from()
  return {
    likeToArray // likeToArray: likeToArray
  }

})()