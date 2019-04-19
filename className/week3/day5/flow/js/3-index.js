/*
* 本次优化了瀑布流排列会出现偶尔插入乱序的问题，！！不要求掌握！！！只是告诉大家可以有这样的解决方案。
* Promise + async + await 异步编程解决方案！！！
* */
let flowRender = (function () {
  let isRun = false; // 标识符标识当前是否有正在进行的请求
  // 获取元素
  let flowList = document.querySelectorAll('#flowBox li');
  // 1. 请求数据的方法
  let page = 0;
  let queryData = () => {
    if (page > 3) {
      alert('没有更多数据了！');
      window.onscroll = null;
      return;
    }
    isRun = true;
    page++;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `json/data.json?page=${page}`, false);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        let data = JSON.parse(xhr.responseText);
        bindHTML(data);
      }
    };
    xhr.send(null);
  };

  let resolveImg = (url) => {
    return new Promise((resolve, reject) => {
      let newImg = document.createElement('img');
      newImg.src = url;
      newImg.onload = function () {
        let {width, height} = newImg;
        let cal = Math.round(300 / width * height); // 按比例计算出最后图片的高度 300是列宽320px减去左右padding 10px，
        resolve(cal);
      };
      newImg.onerror = reject;
    });
  };
  let fetchImg = (ary) => {
    let mappings = ary.map(async (item, index) => {
      if (item) {
        return await resolveImg(item.pic);
      } else {
        return 0;
      }
    });
    return Promise.all(mappings);
  };

  // 2. bindHTML
  async function bindHTML(data) {
    for (let i = 0; i < data.length; i += 3) {
      let dataArr = [
        data[i],
        data[i + 1],
        data[i + 2]
      ];
      let result = await fetchImg(dataArr);
      Array.from(flowList).sort(
        (a, b) => a.getAttribute('data-height') - b.getAttribute('data-height')
      ).forEach((li, liIndex) => {
        if (dataArr[liIndex]) {
          li.innerHTML += queryHTML(dataArr[liIndex]);
          li.setAttribute('data-height', +li.getAttribute('data-height') + result[liIndex])
        }
      });
      isRun = false;
      // 不使用await
      // fetchImg(dataArr).then((result) => {
      //   // 给三列排序
      //   Array.from(flowList).sort(
      //     (a, b) => a.getAttribute('data-height') - b.getAttribute('data-height')
      //   ).forEach((li, liIndex) => {
      //     if (dataArr[liIndex]) {
      //       li.innerHTML += queryHTML(dataArr[liIndex]);
      //       li.setAttribute('data-height', +li.getAttribute('data-height') + result[liIndex])
      //     }
      //   });
      //   isRun = false;
      //   lazyLoad()
      // });
    }
    lazyLoad();
  }

  // 3. 拼接模板字符串
  function queryHTML({link, pic, title}) {
    return `<a href="${link}">
      <div>
        <img alt="" data-src="${pic}">
      </div>
      <span>${title}</span>
    </a>`
  }

  // 4. 加载更多
  function loadMore() {
    window.onscroll = function () {
      lazyLoad();
      let pageH = document.documentElement.scrollHeight;
      let winScrollTop = document.documentElement.scrollTop;
      let winH = document.documentElement.clientHeight;
      if (pageH - winScrollTop - winH <= 100) {
        if (isRun) return;
        queryData()
      }
    }
  }

  // 5. 图片懒加载
  function lazyLoad() {
    let imgList = document.getElementsByTagName('img');
    for (let i = 0; i < imgList.length; i++) {
      let item = imgList[i];
      let imgOffsetTop = item.offsetTop;
      let winScrollTop = document.documentElement.scrollTop;
      let winH = document.documentElement.clientHeight;
      let dataSrc = item.getAttribute('data-src');

      if (
        imgOffsetTop - winScrollTop - winH <= 100 &&
        !item.src
      ) {
        //!item.src => 优化点：如果图片没有src属性时，说明img还没进行过懒加载。如果图片已经有src属性说明已经被加载过了，就不需要再进行懒加载处理了。
        let newImg = document.createElement('img');
        newImg.src = dataSrc;
        newImg.onload = function () {
          item.src = dataSrc;
          newImg = null
        }
      }
    }
  }

  return {
    init() {
      queryData();
      loadMore();
    }
  }
})();
flowRender.init();