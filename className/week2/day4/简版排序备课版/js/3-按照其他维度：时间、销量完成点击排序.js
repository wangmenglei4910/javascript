/*
* 第一个按照价格排序功能已经实现，给其他的a标签绑定事件；
* 之前我们在排序里面只是实现的按照价格排序，按照时间和销量排序还需要实现
* 思考1？我们需要在排序的时候获知点击的是价格还是时间还是销量，但是如何获取呢？
*   1. 操作获取点击a标签里面的汉字，可以知晓是点击的哪一个
*   2. 因为每个a标签在productList集合里面的索引是不同的，我们可以根据不同索引来判断点击的是第几个，如果点击的索引为0，那么就是点击上架时间，如果索引为 1就是价格 ....
* 思考2？我们怎么在sortList方法里面获取当前点击的索引呢？
*   提示1：我们在绑定事件时时知道每个a标签的索引的，所以我们可以绑定事件时通过自定义属性：linkList[i].index = i 的方式来记录索引。带点击事件触发时，从元素身上获取。
*   提示2：点击事件里面this就是当前点击的a标签，所以this.index就是该标签的索引。在事件触发时，sortList() 被调用，此时sortList内部的this是window，如果我们在事件的函数里将sortList方法里面的this修改成当前事件函数中的this，那么sortList函数内的this就是当前点击的标签。
*
* */

// 获取元素
let headerBox = document.getElementById('header');
let linkList = headerBox.getElementsByTagName('a');
let listBox = document.getElementById('list');
let productList = listBox.getElementsByTagName('li');

let flag = -1; // flag初始值为-1

// 点击价格实现按照价格升序排列
let sortList = function () {
  // 1. 将productList 转换为数组
  let productArr = [].slice.call(productList);


  // 2. 基于sort给productArr排序
  productArr.sort((a, b) => {
    // 获取当前被点击a标签的索引
    let index = this.index;
    console.log(index);
    let aP, bP;

    // 根据不同索引按照不同维度（时间、价格、销量）排序
    switch (index) {
      case 0:
        aP = a.getAttribute('data-time');
        bP = b.getAttribute('data-time');
        break;
      case 1:
        aP = a.getAttribute('data-price');
        bP = b.getAttribute('data-price');
        break;
      case 2:
        aP = a.getAttribute('data-hot');
        bP = b.getAttribute('data-hot');
    }
    if (index === 0) {
      // 时间是 2018-01-10 里面有中划线，不能直接相减，所以需要利用正则把-替换掉就可以变成数字，可以直接相减
      aP = aP.replace(/-/g, '');
      bP = bP.replace(/-/g, '');
    }
    return (aP - bP) * flag;
  
  });

  // 3. 基于排好序的数组，依次将li重新添加到页面中
  for (let i = 0; i < productArr.length; i++) {
    let item = productArr[i];
    listBox.appendChild(item)
  }
};

// 循环绑定事件
for (let i = 0; i < linkList.length; i++) {
  linkList[i].index = i;
  linkList[i].onclick = function () {
    flag *= -1;
    sortList.call(this);
  };
}
