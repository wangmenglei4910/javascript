/*
* 思考：程序有个bug，如果第一次点击上架时间，商品按照上架时间排序，但是当我再次点击价格时，正常情况下应该按照价格升序排列，但是却按照价格降序排列，为啥？
* 提示：因为三个a标签在点击时都是修改的同一个全局变量flag，第一次点击时间时在事件函数中乘以了-1，全局变量flag被改成了正1，此时按照时间升序排序，但是再点击价格时，又为全局变量flag乘以了-1，此时flag变为了-1，所以按照价格的降序排列了。
* 解决方案：应该每个a标签掌管自己的flag，每次点击，修改自己的flag，如此就不会影响其他人的flag。（通过自定义属性）
*
* */

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
    return (aP - bP) * this.flag; // 使用自己的flag
  
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
  linkList[i].flag= -1; // 自定义属性，每个a标签保存自己的flag
  linkList[i].onclick = function () {
    this.flag *= -1;
    sortList.call(this);
  };
}
