// ★!★!★!★! 这个文件的代码仅供参考，目的是给大家展示工作中的代码风格

/**
 * 根据元素id获取元素
 * @param 元素ID
 * @returns {HTMLElement}  DOM object
 */
let eleById = function (id) {
  if (!id) throw Error(`the parameter 'id' is NECESSARY for the eleById`);
  return document.getElementById(id)
};

/**
 * 根据标签名从上下文查找元素
 * @param 标签名
 * @param ctx 查找上下文
 * @returns {NodeListOf<Element>} dom 集合
 */
let eleByTagName = function (tagName, ctx = document) {
  if (!tagName) throw Error(`the parameter 'tagName' is NECESSARY for the eleByTagName`);
  return ctx.getElementsByTagName(tagName);
};

/**
 * 遍历方法
 * @param ctx 数组
 * @param cb 遍历时执行的函数
 */
let forEach = (ctx = [], cb) => {
  ctx.forEach((item, index, arr) => {
    cb(item, index, arr)
  })
};

let breakDom = (dom, num) => {}


// 获取元素对象
let headerBox = eleById('header');
let linkList = eleByTagName('a', headerBox);
let listBox = eleById('list');
let productList = eleByTagName('li', listBox);

;(function () {
  let productData = null;

  // 从服务端获取数据
  // ajax在工作中多从类库（工具集）中调用，无需每次自己疯转
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'json/product.json', false);
  xhr.onreadystatechange = () => {
    xhr.readyState === 4 && xhr.status === 200
      ? productData = JSON.parse(xhr.responseText)
      : void 0;
  };
  xhr.send(null);
  if (!productData) return 0;

  // 绑定数据
  let str = ``;
  forEach(productData, (item) => {
    let {
      price,
      title,
      img = '',
      hot,
      time = ''
    } = item;
    str += `<li data-time="${time}" 
                data-price="${price}" 
                data-hot="${hot}">
              <a href="javascript:;">
                <img src="${img}" alt="">
                <p>${title}</p>
                <span>￥${price}</span> <br>
                <span>时间：${time}</span> <br>
                <span>销量：${hot}</span> 
              </a>
        </li>`
  });
  listBox.innerHTML = str;


  /**
   * 处理排序
   * @param that 执行主体（排序时点击的a标签）
   * @param index 索引
   */
  let sortList = (that, index = 0) => {
    let ary = ['data-time', 'data-price', 'data-hot'];

    // 类数组转数组
    let productArr = [...productList];

    // 排序
    productArr.sort((a, b) => {
      let reg = /-/g;
      let aInn = a.getAttribute(ary[index]);
      let bInn = b.getAttribute(ary[index]);
      if (!index) {
        aInn = aInn.replace(reg, '');
        bInn = bInn.replace(reg, '');
      }
      return (aInn - bInn) * that.flag;
    });
    productArr.forEach(item => listBox.appendChild(item))
  };

  // 绑定事件
  let linkListAry = [...linkList];
  forEach(linkListAry, function (item, index) {
    item.flag = -1; // 自定义flag属性，用以表示当前排序是升序或降序
    item.onclick = function () {
      // 重置非当前点击维度的flag值
      forEach(linkListAry, (item) => {
        if (item !== this) item.flag = -1;
      });

      this.flag *= -1; // flag 在-1 和 1之间来回切换
      sortList(this, index);
    }
  });
})();