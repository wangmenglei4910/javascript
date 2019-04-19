;(function () {
  // 请求地址
  const url =
    'https://www.easy-mock.com/mock/5cac8a52f1e8921b5809e141/move/movierating'

  // 元素容器
  const movieRating = document.getElementById('movieRating')

  // 排序的字段
  // 综合票房boxInfo  票房占比boxRate  排片场次showInfo  排片占比showRate 场均人次avgShowView  上座率avgSeatView
  const sortAttr = ['boxInfo', 'boxRate', 'showInfo', 'showRate', 'avgShowView', 'avgSeatView']

  // 票房数据容器
  let ratingList = []

  // 获取初始数据
  function getRatingData(url) {
   // 获取数据
   const xhr = new XMLHttpRequest()

   xhr.open('GET', url, false)

   xhr.onreadystatechange = function () {
     // 200 201 202 304
     if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
       const {data: {list}} = _utils.toJSON(this.responseText)
       ratingList = list
     }
   }

   // 开始发送ajax请求
   xhr.send()
 }

  // 专门用来渲染列表数据
  function renderList(ele, list) {
    let str = ``
    list.forEach(item => {
      const {
        boxRate, // 票房占比
        showInfo, // 排片场次
        showRate, // 排片占比
        avgSeatView, // 上座率
        avgShowView, // 场均人次
        boxInfo, // 综合票房
        movieName, // 电影名称
      } = item

      str += `
        <li>
          <span>${movieName}</span>
          <span class="realtime">${boxInfo}</span>
          <span>${boxRate}</span>
          <span>${showInfo}</span>
          <span>${showRate}</span>
          <span>${avgShowView}</span>
          <span>${avgSeatView}</span>
        </li>
      `
    })

    ele.innerHTML = str
  }

  // 给排序按钮绑定点击事件
  function bindEvent() {
    const btnSorts = document.querySelectorAll('.movie-content_nav>.sort-btn')

    for (let i = 0; i < btnSorts.length; i++) {
      btnSorts[i].flag = -1

      btnSorts[i].onclick = function () {
        this.flag *= -1
        const sid = this.getAttribute('sort-id')
        // 排序的字段 sortAttr[sid]
        sortList(sortAttr[sid], this.flag)
      }
    }
  }

  // 负责对数据进行排序
  function sortList(attr, flag) {
    ratingList.sort((a, b) => {
      let p1 = parseFloat(a[attr])
      let p2 = parseFloat(b[attr])

      // 如果是NaN 就让p1 = 0 p2 = 0
      isNaN(p1) && (p1 = 0)
      isNaN(p2) && (p2 = 0)

      // if (isNaN(p1)) {
      //   p1 = 0
      // }

      return (p1 - p2) * flag
    })

    // 数据排序后 重新渲染到页面
    renderList(movieRating, ratingList)
  }

  // 排序按钮事件绑定
  bindEvent()

  // 获取初始数据列表
  getRatingData(url)

  // 渲染初始数据列表
  renderList(movieRating, ratingList)

})()
