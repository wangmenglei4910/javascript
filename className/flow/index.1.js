~function() {
  const { toJSON } = window._utils

  // 获取操作元素
  const flow = document.getElementById('flow')
  
  // 获取列 [li, li, li, li]
  const cols = flow.getElementsByTagName('li')
  const imgCols = Array.from(cols)

  // 请求图片数据
  function getImageData() {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', './data.json', false)
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && /^2\d{2}/.test(this.status)) {
        render(toJSON(this.responseText))
      }
    }
    xhr.send()
  }

  // 进行数据渲染
  function render(data) {
    for (let i = 0; i < data.length; i++) {
      // 根据每条数据生成 a元素
      let html = htmlStr(data[i])

      // 根据每列高度 从小到大排序 
      // 排序后 数组中索引0那项 高度最小的
      imgCols.sort((a, b) => {
        return a.offsetHeight - b.offsetHeight
      })

      // 插入图片
      imgCols[0].innerHTML += html
    }
  }

  // 图片加载是异步 需要预先将图片高度设置上占位
  // 生成html字符串模板
  function htmlStr(obj) {
    const {
      link,
      src,
      title,
      height
    } = obj
    
    return `
      <a href="${link}">
        <img src="${src}" height="${height}">
        <p class="title">${title}</p>
      </a>
    `
  }

  getImageData()

}()