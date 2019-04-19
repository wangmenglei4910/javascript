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
   Linear(t, b, c, d) {
     return t * (c / d) + b
   }
 }

/**
 *
 * @param ele 动画元素
 * @param target 目标值对象
 * @param duration 过渡时间
 */
function animate({ ele, target = {}, duration = 2000, after }) {
   // 1.默认参数处理
   // 没有传入 ele 元素属性就报错
   if (!ele || ele.nodeType !== 1) {
     return console.error('缺少动画元素ele!')
   }

   // 2.准备动画所需参数
   const { css } = window._utils

   // target 目标值对象
   // 起始值对象 {left, top, opacity}
   let begin = {}
   // 改变值对象 {left, top, opacity}
   let change = {}

   for (let k in target) {
     if (target.hasOwnProperty(k)) {
       begin[k] = css(ele, k)
       change[k] = target[k] - begin[k]
     }
   }

   // 3.记录当前时间
   let time = 0
   const interval = 10 // 定时器间隔时间

   // 防止动画累积 (先将之前动画清除，再创建新的动画)
   ele.timer && clearInterval(ele.timer)

   // 4.创建动画定时器
   ele.timer = setInterval(() => {
     // 记录当前动画时间
     time += interval

     // 动画结束判断
     if (time >= duration) {
       css(ele, target)

       clearInterval(ele.timer)

       // 声明周期函数 （钩子函数 vue react）
       ;(typeof after === 'function') && after.call(ele)

       return
     }

     // 根据当前时间 计算当前状态
     // 暂存当前转态的对象
     let curState = {}
     // {left, top, opacity}
     for (let k in target) {
       if (target.hasOwnProperty(k)) {
         // 计算出每个属性当前状态
         curState[k] = Effect.Linear(time, begin[k], change[k], duration)
       }
     }

     // 将当前元素相应样式属性 设置为 当前状态
     css(ele, curState) // {left, top, opacity}
   }, interval)
}

// 默认参数处理
// let duration = options.duration || 2000
// let target = options.target || {}

 // var obj = {
 //   ele: box,
 //   target: {
 //     left: 600,
 //     top: 600
 //   },
 //   duration: 2000
 // }
 //
 // let { ele, target = {}, duration } = obj
