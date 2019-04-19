~(function() {
  // 导入依赖 工具方法
  const { toJSON, likeAryTo } = window._utils;

  // 获取操作元素 [li, li, li, li]
  const cols = document.querySelectorAll("#flow>li");
  // 将元素集合转换成数组(sort)
  // const flowCols = likeAryTo(cols)
  const flowCols = Array.from(cols)


  // 获取图片数据
  function getImgData() {
    // 1.创建ajax实例
    const xhr = new XMLHttpRequest();
    // 2.配置请求方式 请求地址 是否同异步
    xhr.open("GET", "./data.json", false);
    // 3.监听数据响应
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
        // 字符串拼接方式
        // renderHtml(toJSON(this.responseText));
        // 动态创建
        render(toJSON(this.responseText))
      }
    };
    // 4.发送ajax请求
    xhr.send();
  }

  // 数据绑定 - 动态创建（createElement）
  function render(data) {
    data.forEach(item => {
      // 动态创建DOM
      const dom = createDOM(item)
      
      // 对列进行排序
      flowCols.sort((a, b) => a.offsetHeight - b.offsetHeight)
      flowCols[0].appendChild(dom)
    })
  }

//   <a href="https://www.baidu.com">
//     <img src="./images/loading.jpg" alt="">
//     <p>我是标题</p>
//   </a>
  function createDOM(item) {
     const { link, src, title, height } = item
     // 创建a标签
     const a = document.createElement('a')
     a.href = link

     // 创建img标签
     const img = document.createElement('img')
     img.src = src
     img.setAttribute('height', height)

     // 创建p标签
     const p = document.createElement('p')
     p.innerHTML = title

     // 将img p元素 分别追加到a元素内
     a.appendChild(img)
     a.appendChild(p)
     return a
  }

  // 数据绑定 - 字符串拼接方式
  // function renderHtml(data) {
  //   data.forEach(item => { // item每条图片数据对象
  //     // 根据每条数据生成 HTML字符串
  //     const htmlStr = createHtml(item);

  //     // 根据每列自身高度进行排序
  //     flowCols.sort((a, b) => a.offsetHeight - b.offsetHeight)
  //     // 把当前HTML字符串 追加到 高度最矮的那一列

  //     // 字符串拼接方式 每次追加 都会导致整个页面元素 重新渲染 将之前的覆盖掉
  //     flowCols[0].innerHTML += htmlStr
  //     // flowCols[0].innerHTML = flowCols[0].innerHTML + htmlStr
  //   });
  // }

  // 生成HTML字符串
  // function createHtml(item) {
  //   const { link, src, title, height } = item;
  //   return  `
  //   <a href="${link}">
  //     <img src="${src}" height="${height}" alt="">
  //     <p>${title}</p>
  //   </a>
  // `;
  // }

  // 请求初始数据
  getImgData();


  // => ajax请求数据
  // => render(data)
  // => data.forEach(item)
  // => createHtml(item)
  // => htmlStr 
})();
