// 获取元素
let headerBox = document.getElementById('header');
let linkList = headerBox.getElementsByTagName('a');
let listBox = document.getElementById('list');
let productList = listBox.getElementsByTagName('li');

// 点击价格实现按照价格升序排列
let sortList = function () {
  // 1. 将productList 转换为数组
  let productArr = [].slice.call(productList);
  
  // 2. 基于sort给productArr排序
  productArr.sort((a, b) => {
    // a b都是li的元素对象，因为我们按照价格排序，所以要从li中获取到价格。因为之前我们在html中通过自定义属性的方式记录了价格，所以此时可以通过 getAttribute获取价格
    let aP = a.getAttribute('data-price');
    let bP = b.getAttribute('data-price');
    return aP - bP
  });
  console.log(productArr);

  // 3. 基于排好序的数组，依次将li重新添加到页面中
  for (let i = 0; i < productArr.length; i++) {
    let item = productArr[i];
    listBox.appendChild(item)
  }
};

linkList[1].onclick = function () {
  sortList();
};
