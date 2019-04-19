~(function () {
  // 运动方式
  var Effect = {
    // 匀速运动公式
    Linear: function (t, b, c, d) {
      return (t / d) * c + b
    },
    //指数衰减的反弹缓动
    Bounce: {
      easeIn: function (t, b, c, d) {
        return c - Effect.Bounce.easeOut(d - t, 0, c, d) + b
      },
      easeOut: function (t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
          return c * (7.5625 * t * t) + b
        } else if (t < 2 / 2.75) {
          return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
        } else if (t < 2.5 / 2.75) {
          return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
        } else {
          return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
        }
      },
      easeInOut: function (t, b, c, d) {
        if (t < d / 2) {
          return Effect.Bounce.easeIn(t * 2, 0, c, d) * 0.5 + b
        }
        return Effect.Bounce.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
      }
    },
    //二次方的缓动
    Quad: {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b
      },
      easeOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
          return (c / 2) * t * t + b
        }
        return (-c / 2) * (--t * (t - 2) - 1) + b
      }
    },
    //三次方的缓动
    Cubic: {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t * t + b
      },
      easeOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
          return (c / 2) * t * t * t + b
        }
        return (c / 2) * ((t -= 2) * t * t + 2) + b
      }
    },
    //四次方的缓动
    Quart: {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b
      },
      easeOut: function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
          return (c / 2) * t * t * t * t + b
        }
        return (-c / 2) * ((t -= 2) * t * t * t - 2) + b
      }
    },
    //五次方的缓动
    Quint: {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b
      },
      easeOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
          return (c / 2) * t * t * t * t * t + b
        }
        return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b
      }
    },
    //正弦曲线的缓动
    Sine: {
      easeIn: function (t, b, c, d) {
        return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b
      },
      easeOut: function (t, b, c, d) {
        return c * Math.sin((t / d) * (Math.PI / 2)) + b
      },
      easeInOut: function (t, b, c, d) {
        return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b
      }
    },
    //指数曲线的缓动
    Expo: {
      easeIn: function (t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
      },
      easeOut: function (t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b
      },
      easeInOut: function (t, b, c, d) {
        if (t == 0) return b
        if (t == d) return b + c
        if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b
        return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b
      }
    },
    //圆形曲线的缓动
    Circ: {
      easeIn: function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
      },
      easeOut: function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
          return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b
        }
        return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
      }
    },
    //超过范围的三次方缓动
    Back: {
      easeIn: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158
        return c * (t /= d) * t * ((s + 1) * t - s) + b
      },
      easeOut: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
      },
      easeInOut: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158
        if ((t /= d / 2) < 1) {
          return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b
        }
        return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
      }
    },
    //指数衰减的正弦曲线缓动
    Elastic: {
      easeIn: function (t, b, c, d, a, p) {
        if (t == 0) return b
        if ((t /= d) == 1) return b + c
        if (!p) p = d * 0.3
        var s
        !a || a < Math.abs(c)
          ? ((a = c), (s = p / 4))
          : (s = (p / (2 * Math.PI)) * Math.asin(c / a))
        return (
          -(
            a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p)
          ) + b
        )
      },
      easeOut: function (t, b, c, d, a, p) {
        if (t == 0) return b
        if ((t /= d) == 1) return b + c
        if (!p) p = d * 0.3
        var s
        !a || a < Math.abs(c)
          ? ((a = c), (s = p / 4))
          : (s = (p / (2 * Math.PI)) * Math.asin(c / a))
        return (
          a *
          Math.pow(2, -10 * t) *
          Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
          c +
          b
        )
      },
      easeInOut: function (t, b, c, d, a, p) {
        if (t == 0) return b
        if ((t /= d / 2) == 2) return b + c
        if (!p) p = d * (0.3 * 1.5)
        var s
        !a || a < Math.abs(c)
          ? ((a = c), (s = p / 4))
          : (s = (p / (2 * Math.PI)) * Math.asin(c / a))
        if (t < 1)
          return (
            -0.5 *
            (a *
              Math.pow(2, 10 * (t -= 1)) *
              Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
            b
          )
        return (
          a *
          Math.pow(2, -10 * (t -= 1)) *
          Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
          0.5 +
          c +
          b
        )
      }
    }
  }

  const {css} = window._utils

  /**
   * @param options
   * ele {object} 动画元素
   * target {object} 目标参数对象
   * effect {Number}|{Array} 运动方式 Number: 0 1 2 3  Array: ['Quint', 'easeInOut']
   * duration {Number} 过渡时间 单位：ms
   * callBack {function} 动画结束后回调
   */
  function animate({
     ele,
     target = {},
     effect = Effect.Linear,
     duration = 2000,
     callback = function () {
     }
   }) {
  // 处理元素ele
    if (!ele) {
      console.warn('未指定动画元素: ele属性')
      return
    }
    // 默认参数处理
    // var target = options.target || {}
    // var effect = options.effect || Effect.Linear
    // var duration = options.duration || 2000
    // var callback = options.callback || function () {}

    ele._timer && clearInterval(ele._timer) // 防止动画累积 每次执行新动画执行之前 清除上一次的动画

    // 处理effect运动方式
    if (typeof effect === 'number') {
      // 数字方式 指定几种常用运动方式
      switch (effect) {
        case 0:
          effect = Effect.Linear
          break
        case 1:
          effect = Effect.Bounce.easeIn
          break
        case 2:
          effect = Effect.Cubic.easeInOut
          break
        default:
          effect = Effect.Expo.easeInOut
      }
    } else if (effect instanceof Array) {
      // 数组方式 指定具体运动方式 ['Quint', 'easeInOut']
      effect =
        effect.length === 2 ? Effect[effect[0]][effect[1]] : Effect.Linear
    }

    var begin = {} // 起始值参数对象
    var change = {} // 变化值参数对象
    for (var k in target) {
      if (target.hasOwnProperty(k)) {
        // 将相应属性的起始值 保存到 begin中
        begin[k] = css(ele, k)
        // 相应属性变化值 = 相应属性目标值 - 相应属性起始值
        change[k] = target[k] - begin[k]
      }
    }

    // 动画处理
    // t 当前时间 b 起始值 c 变化值 d 过渡时间
    var interval = 10 // 单位时间
    var timer = null // 记录当前时间
    ele._timer = setInterval(function () {
      timer += interval
      if (timer >= duration) {
        // 边界结束判断
        css(ele, target) // 修正为最终目标状态
        clearInterval(ele._timer) // 结束动画
        // 执行动画回调
        typeof callback === 'function' ? callback.call(ele) : null
        return
      }

      for (var k in target) {
        // 计算当前运动状态
        if (target.hasOwnProperty(k)) {
          // 根据当前时间 time 计算出当前k属性的 运动状态
          var curState = effect(timer, begin[k], change[k], duration)
          // 将相应的属性 设置为 此时的 运动状态
          css(ele, k, curState)
        }
      }
    }, interval)
  }

  window.$animate = animate
})()
