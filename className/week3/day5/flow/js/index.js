let flowRender = (function () {
  // 获取元素
  let list = document.getElementById('flowBox');
  let flowList = document.getElementsByTagName('li');

  // 获取数据
  let queryData = function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'json/data.json', false);
    xhr.onreadystatechange = function () {
      if (+xhr.readyState === 4 && +xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);

        // 数据拿到了，接下来需要绑定数据
        insertHTML(data);
      }
    };
    xhr.send(null);
  };

  // 生成HTML字符串
  let queryHMTL = function ({id, title, link, pic}) {
    return `<a href="${link}">
      <div><img data-src="${pic}" alt=""></div>
      <span>${title}</span>
    </a>`
  };

  let sortLi = function () {
    let flowListAry = Array.from(flowList);

    // 按照li的实际内容高度排序，分为两种情况吧
    // 1. 页面初次加载时，每个li都是空的，这时不用排，直接返回即可
    // 2. 如果不是初次加载，按照每个li的实际高度，是不是offsetHeight排序
    if (flowList[0].offsetHeight === 0) {
      return flowListAry
    }
    return flowListAry.sort((a, b) => a.offsetHeight - b.offsetHeight)
  };

  // 绑定数据
  let insertHTML = function (data) {
    for (let i = 0; i < data.length; i += 3) {
      let ary = [
        data[i],
        data[i + 1],
        data[i + 2]
      ];

      // 给li按照其内容的高度排序
      let flowListAry = sortLi();

      // 根据li的高度向其末尾追加内容
      ary.forEach((item, index) => {
        item
          ? flowListAry[index].innerHTML += queryHMTL(item)
          : null;
      })
    }
  };

  // 加载更多
  let loadMore = function () {
    let winH = document.documentElement.clientHeight;
    let pageH = document.documentElement.offsetHeight;
    let winScrlTop = document.documentElement.scrollTop;

    if ((pageH - winScrlTop - winH) <= 100) {
      queryData();
    }
  };

  // 图片懒加载
  let lazyLoad = function () {
    let imgList = document.querySelectorAll('img');

    for (let i = 0; i < imgList.length; i++) {
      let item = imgList[i];
      let imgOffsetTop = item.offsetTop;
      let winH = document.documentElement.clientHeight;
      let pageSctp = document.documentElement.scrollTop;
      if (imgOffsetTop - winH - pageSctp <= 100 && !item.src) {
        // imgOffsetTop - winH - pageSctp === 0 说明恰好要出来了，如果小于0说明已经出来
        let newImg = document.createElement('img');
        let dataSrc = item.getAttribute('data-src');
        newImg.src = dataSrc;
        newImg.onload = function () {
          item.src = dataSrc;
          newImg = null; // 手动释放内存
        }
      }
    }
  };
  return {
    init () {
      queryData();
      lazyLoad();
      window.onscroll = function () {
        loadMore();
        lazyLoad();
      }
     }
  }
})();
flowRender.init();