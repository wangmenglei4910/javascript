## 动画

### 动画所需参数
- 1.过渡时间 duration
- 2.目标状态 target
- 3.初始状态 begin
- 4.改变距离 change (target - begin)
- 5.记录当前时间 time time += interval(定时器间隔时间)

- 6.创建一个定时器（setInterval）
- 7.定时器每次执行的时候，用time记录当前动画时间
- 8.利用运动公式（linear）,根据 t(time) b(begin) c(change) d(duration)    计算出当前状态curState，
- 9.再把当前状态设置给当前元素的相应的样式属性。
- 10.动画结束判断。

```js
  box.timerID = setInterval(() => {
    // 记录当前时间
    time += interval

    // 动画结束判断
    if (time >= duration) {
      css(box, {
        left: targetLeft,
        top: targetTop,
        opacity: targetOp
      })
      clearInterval(box.timerID)
      return
    }

    // 根据 t(time) b(begin) c(change) d(duration) 计算出当前状态
    let curLeft = linear(time, beginLeft, changeLeft, duration)
    let curTop = linear(time, beginTop, changeTop, duration)
    let curOp = linear(time, beginOp, changeOp, duration)
    
    // 将当前状态设置给当前元素相应的样式属性
    css(box, {
      left: curLeft,
      top: curTop,
      opacity: curOp
    })
  }, interval)
```
