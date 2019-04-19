// 思考，如果实现第一次点击升序，第二次点击降序呢？
/*

 *
 * ? 如果想实现第一次点击时升序排列，需要在sort方法里return aP - bP，再次点击时降序排列只需要在sort方法里return bP - aP 即可。 又因为
 * (aP - bP) * -1 = bP - aP
 * (bP - aP) * -1 = aP - bP
 * (aP - bP) * -1 = bP - aP
 * (bP - aP) * -1 = aP - bP
 * ...

 * => 所以此时，我们需要一个变量，它的值是 -1，只要点击时，为其乘以 -1，使这个值在1和-1之间来回切换。最后让sort方法的方法的返回值乘上这个变量即可实现第一次点击时升序，第二次点击时降序，第三次点击升序....
 */


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
    let aP = a.getAttribute('data-price');
    let bP = b.getAttribute('data-price');
    return (aP - bP) * flag;
  
  });
  console.log(productArr);

  // 3. 基于排好序的数组，依次将li重新添加到页面中
  for (let i = 0; i < productArr.length; i++) {
    let item = productArr[i];
    listBox.appendChild(item)
  }
};

linkList[1].onclick = function () {
  flag *= -1;
  sortList();
};
