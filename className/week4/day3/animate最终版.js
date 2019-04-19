~function () {
  const { css } = window._utils

  // Effect 运动方式
  const Effect = {
    // Linear: function() {}
    /**
     * 匀速运动公式
     * @param t 当前时间
     * @param b 起始值
     * @param c 改变值（目标值 - 起始值）
     * @param d 过渡时间
     */
    linear(t, b, c, d) {
      return t * (c / d) + b
    },
    easeIn(t, b, c, d) {
      return c - Effect.easeOut(d - t, 0, c, d) + b
    },
    easeOut(t, b, c, d) {
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
    easeInOut(t, b, c, d) {
      if (t < d / 2) {
        return Effect.easeIn(t * 2, 0, c, d) * 0.5 + b
      }
      return Effect.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
    }
  }

  /**
   *
   * @param [object] ele 当前动画元素
   * @param [object] target 目标值对象
   * @param [number] duration 过渡时间
   * @param [function] after 动画结束钩子函数
   */

  function animate({ ele, target = {}, duration = 2000, after, before, run, effect = 'linear' }) {

    // 参数判断处理
    if (!ele || ele.nodeType !== 1) {
      return console.error('缺少元素对象ele~')
    }

    // 动画开始之前的 钩子函数
    ;(typeof before === 'function') && before.call(ele)

    // 收集参数 begin change
    let begin = {}
    let change = {}

    for (let k in target) {
      if (target.hasOwnProperty(k)) {
        begin[k] = css(ele, k)
        change[k] = target[k] - begin[k]
      }
    }

    // 记录当前时间
    let time = 0
    // 定时器间隔时间
    const interval = 10

    // 动画累积
    ele.timer && clearInterval(ele.timer)

    // 创建动画定时器
    ele.timer = setInterval(() => {
      // 动画执行过程中的 钩子函数
      ;(typeof run === 'function') && run.call(ele)

      // 记录当前动画时间
      time += interval

      if (time >= duration) {
        // 修正元素动画目标值
        css(ele, target)
        clearInterval(ele.timer)

        // 动画结束后的 钩子函数
        ;(typeof after === 'function') && after.call(ele)
        return
      }

      // 根据当前时间 计算当前状态
      let curState = {}
      for (let k in target) {
        if (target.hasOwnProperty(k)) {
          curState[k] = Effect[effect](time, begin[k], change[k], duration)
        }
      }

      // 将当前状态 设置给当前元素
      css(ele, curState)
    }, interval)

  }

  // 过载到全局
  window.$animate = animate
}()
