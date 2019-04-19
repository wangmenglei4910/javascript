// 1. 获取元素（分析操作谁，我们就要获取谁）
let headerBox = document.getElementById('header'),
  linkList = headerBox.getElementsByTagName('a'),
  listBox = document.getElementById('list'),
  productList = listBox.getElementsByTagName('li');

// 2. 按照价格给productList排序

let flag = -1;
let sortList = function () {
  // console.log(this);
  let innerText = this.innerText;
  console.log(innerText);
  // 1. getElementsByTagName获取到的是一个类数组集合，想调用sort，需要把productList转成一个数组
  let productAry = [].slice.call(productList);

  let aInn, bInn;

  // 2. 基于sort按照价格给productAry排序
  productAry.sort((a, b) => {
    switch (innerText) {
      case '上架日期':
        aInn = a.getAttribute('data-time');
        bInn = b.getAttribute('data-time');
        break;
      case '价格':
        aInn = a.getAttribute('data-price');
        bInn = b.getAttribute('data-price');
        break;
      case '热度':
        aInn = a.getAttribute('data-hot');
        bInn = b.getAttribute('data-hot');
        break;
    }

    if (innerText === '上架日期') {
      // 如果点击的是上架日期，我们需要把日期中划线（-）去掉
      aInn = aInn.replace(/-/g, '');
      bInn = bInn.replace(/-/g, '');
    }

    return (aInn - bInn) * this.flag;

  });
  // console.log(productAry);

  // 3. 把排好序的数组中li依次还要再添加到页面中
  for (let i = 0; i < productAry.length; i++) {
    listBox.appendChild(productAry[i]) // appendChild是向容器末尾追加一个新元素，但是listBox里面还是6个，不是12个，只是顺序发生了改变。
  }

};

// 给价格按钮绑定一个点击事件，在事件触发时调用sortList方法


// 循环绑定事件
for (let j = 0; j < linkList.length; j++) {
  linkList[j].flag = -1; // 因为前面的操作，是三个按钮点击时修改的是同一全局中的flag变量，所以会引发排序混乱的bug，为了解决这个问题，让每个a标签自己拥有一个flag，每次点击只给自己的flag *= -1;
  linkList[j].onclick = function () {
    // 重置其他两个a标签里面的flag
    for (let k = 0; k < linkList.length; k++) {
      if (linkList[k] !== this) {
        // 只要不是当前点击的就重置其flag
        linkList[k].flag = -1;
      }
    }

    this.flag *= -1; // 让flag在-1 he 1 之间来回切换，就能实现升降序的来回切换
    sortList.call(this);
  }
}












