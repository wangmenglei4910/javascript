// 1. 获取元素（分析操作谁，我们就要获取谁）
let headerBox = document.getElementById('header'),
  linkList = headerBox.getElementsByTagName('a'),
  listBox = document.getElementById('list'),
  productList = listBox.getElementsByTagName('li');

// console.log(linkList);
// console.log(productList);

// 2. 按照价格给productList排序

let flag = -1;
let sortList = function () {
  // 1. getElementsByTagName获取到的是一个类数组集合，想调用sort，需要把productList转成一个数组
  let productAry = [].slice.call(productList);
  // let productAry = Array.from(productList);
  // let productAry = [...productList];

  // console.log(productAry);

  // 2. 基于sort按照价格给productAry排序
  productAry.sort((a, b) => {
    // console.log(a, b);
    // a、b都是li，我们需要从li中获取价格
    let aP = a.getAttribute('data-price');
    let bP = b.getAttribute('data-price');
    return (aP - bP) * flag;

    // console.log(aP, bP);
    // return aP - bP; 升序
    // return bP - aP; // 降序
    // return aP - bP; // 升序
    // (aP - bP) * -1 => bP - aP ??
    // (aP - bP) * -1 => aP * (-1) + (-bP * -1) => -aP + bP => bP - aP
    // (bP - aP) * -1 => aP - bP

    // 因为aP - bP能够实现升序排列，如果希望降序排列，这里就需要变成 bP - aP。再次排序我们需要升序排列，就要变成aP - bP；
  });
  console.log(productAry);

  // 3. 把排好序的数组中li依次还要再添加到页面中
  for (let i = 0; i < productAry.length; i++) {
    listBox.appendChild(productAry[i]) // appendChild是向容器末尾追加一个新元素，但是listBox里面还是6个，不是12个，只是顺序发生了改变。
  }

};

// 给价格按钮绑定一个点击事件，在事件触发时调用sortList方法

linkList[1].onclick = function () {
  flag *= -1; // 让flag在-1 he 1 之间来回切换，就能实现升降序的来回切换
  sortList();
}

/*
* DOM映射：页面中的HTML元素和通过js相关方法（getElementById/getElementsByTagName..【不含querySelector、querySelectorAll】）获取的元素集合和元素对象存在映射关系。（一个改，另一个也会跟着改）
* xxx.style.backgroundColor = 'red'：将xxx元素对象对应的堆内存空间里面的style属性下的backgroundColor属性值修改成了red；（本质是操作js的堆内存）但是有DOM映射机制，元素标签和堆内存是绑定的，只要我们修改了堆内存空间里面的值，元素就会按照最新的值渲染。
*
* appendChild: 向容器末尾追加一个元素，但是如果这个元素已经存在于之前容器中，此时，不是复制一份一模一样的再插入到容器末尾，而是直接把这个元素移动到容器末尾。
*
*
*
*
*
*
* */






