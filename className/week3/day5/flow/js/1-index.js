/*
* 瀑布流：多列不规则排列，每一列由很多块儿构成，每一块儿宽度固定，高度不固定，按照某种规则排列，最终这些列之间高度不能相差太大。同时当页面滑动到底部时就去加载下一页，并且为图片设置懒加载功能。
*
* 思路：首先获取我们需要的数据（假设有20条，一共三列）。首先我们取3条数据先插入每一列中（因为每一条的高度不固定，所以第一次插入数据后，这些列有高有低），然后我们再取3条数据，但是本次不是直接插入每一列，而是先按照高度给这些列排序，接下来先给最矮的插入一条数据，然后给倒数第二矮的插，最后给最高的插，以此类推，将数据都插入到三列中。
*
* */
// 1. 获取元素
let flowBox = document.getElementById('flowBox');
let flowList = flowBox.getElementsByTagName('li');
let isRun = false; // 标识符，标识当前是否有正在进行的数据请求

// 2. 从服务端请求数据
let imgData = null; // 定义一个空变量准备接收数据
let page = 0; // 请求第几页的数据
let queryData = () => {
  // 真实项目中，瀑布流第一次打开时只加载第一页的数据，当用户滚动到页面底部时，我们需要请求第二页的数据。服务端的接口其实还需要我们把请求的是第几页这个参数告诉他，然后服务端会把对应页数的内容返回给前端。（分页技术）
  page++;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `json/data.json?page=${page}`, false);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
      imgData = JSON.parse(xhr.responseText)
    }
  };
  xhr.send(null); // 千万不要忘记send，不send就是请求没发送
};
queryData();

// 3. 绑定数据

let bindHTML = () => {
  // 每三个一组，如果有10条数据，第一次取三个，取的是索引为0 1 2这三个，下一次再取三个，取得索引是 3 4 5，所以 i += 3(你想几个一组就i加等于几)
  // 数组一共有10个，最大索引值就是9，所以索引为 10 11 都不存在。说明我们这么取出来的数据不一定存在，在绑定数据之前我们还需要验证这一项是不是存在（不存即是undefined）
  // i = 0  0 1 2
  // i = 3  3 4 5
  // i = 6  6 7 8
  // i = 9  9 10 11
  for (let i = 0; i < imgData.length; i += 3) {
    let item1 = imgData[i];
    let item2 = imgData[i + 1];
    let item3 = imgData[i + 2];
    
    // 先给页面中的三列按照高度排序
    let flowListAry = Array.from(flowList); // 将li元素集合转换成数组
    flowListAry.sort((a, b) => {
      return a.offsetHeight - b.offsetHeight;
    });
    // 排好序后flowListAry中索引为0的是最矮的，为1的第二矮的，索引为2的是最高的
    if (item1) {
      flowListAry[0].innerHTML += `<a href="${item1.link}">
      <div>
        <img alt="" data-src="${item1.pic}">
      </div>
      <span>${item1.title}</span>
    </a>`
    }
    
    if (item2) {
      flowListAry[1].innerHTML += `<a href="${item2.link}">
      <div>
        <img alt="" data-src="${item2.pic}">
      </div>
      <span>${item2.title}</span>
    </a>`
    }
    
    if (item3) {
      // IDE -vscode 替换快捷键 ctrl + h
      // IDE-webstorm ctrl + r
      flowListAry[2].innerHTML += `<a href="${item3.link}">
      <div>
        <img alt="" data-src="${item3.pic}">
      </div>
      <span>${item3.title}</span>
    </a>`
    }
  }
  isRun = false; // 在这里将isRun置为false表示本次数据请求和绑定已经完成（你可以进行下一次请求了）
};
bindHTML();
lazyLoad();


// 4. 加载更多了
// 1.什么时候去加载更多？页面滑动到底部的时候去加载更多。
// 2. 我们如何知道页面滚动到底了呢？
window.onscroll = function () {
  // 页面滚动就会触发onscroll事件，我们需要在滚动时计算页面是否滚动到底了。
  // 如何计算页面是否滚动到底了？
  // 页面真实高度 - 滚动条卷去的高度 - 浏览器可视窗口的高度 === 0 表示页面已经滚动到底了
  lazyLoad();
  let pageH = document.documentElement.scrollHeight || document.body.scrollHeight;
  let winScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let winH = document.documentElement.clientHeight || document.body.clientHeight;
  if (pageH - winScrollTop - winH <= 100) { // 为了提升用户体验，我们在距离底部还有一段距离时就去请求
    if (isRun) return; // isRun 为true表示当前有正在进行的数据请求，所以不能进行下一次请求了
    isRun = true; // 置为true表示当前有正在进行的数据请求。
    queryData();
    bindHTML();
  }
};

// 5. 图片懒加载
function lazyLoad() {
 // 1. 获取所有的img元素
 let imgList = document.querySelectorAll('img');
 // 2. for循环遍历imgList，在遍历过程中判断每一张图片是否出现在浏览器的可视窗口。
  for (let i = 0; i < imgList.length; i++) {
    let item = imgList[i];
    let imgOffsetTop = item.offsetTop; // 当前图片距离body顶端的偏移量
    let winScrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 获取当前页面滚动条卷去的高度
    let winH = document.documentElement.clientHeight || document.body.clientHeight;
    let dataSrc = item.getAttribute('data-src');
    if (imgOffsetTop - winScrollTop - winH <= 100) {
      // 等于0时表示图片即将出现在浏览器的可视区域，但是为了用户体验，我们让图片距离出来还有100px的时候就去加载图片
      let newImg = document.createElement('img');
      newImg.src = dataSrc;
      newImg.onload = function () {
        // 只要进入onload，说明这个newImg尝试加载成功了，此时我们可以让item【当前图片】去加载图片资源了
        item.src = dataSrc;
        newImg = null; // 手动释放newImg的堆内存
      }
    }

  }
}


















