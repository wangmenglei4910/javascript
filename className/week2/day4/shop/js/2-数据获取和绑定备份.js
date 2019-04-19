/*
* 数据动态获取和绑定
*   => 真实项目中，我们页面中的大部分数据都不是写死的，而是通过AJAX/JSONP等技术从服务端根据api接口地址获取的。
*   1. 基于ajax/jsonp从服务器端获取数据
*   2. 解析处理我们从服务端获取的数据
*   3. 数据绑定，就是把我们获取的数据绑定到页面中的HTML结构上。ES6模板字符串：`bg${i % 2}`
*
*
* */
let productData = null;

// 1. 基于ajax获取数据
let xhr = new XMLHttpRequest(); // 创建一个ajax实例对象
xhr.open('GET', 'json/product.json', false); // 调用xhr的open方法
/*
* open方法的参数
*   1. http method 请求方式 GET
*   2. 接口地址，服务端提供的获取地址的一个路径
*   3. 设置同步还是异步，true表示异步，false表示同步；项目中常用的是异步，今天为了简便实用同步。
* */
xhr.onreadystatechange = function () {
  // 监听xhr的onreadystatechange 事件
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 如果满足这个条件，就表示当前请求已经顺利完成
    productData = xhr.responseText;
  }
};
xhr.send(null); // 发送ajax请求

// console.log(productData);
// console.log(typeof productData);

// ctrl + shift + del(delete) 清除浏览器缓存 刷新

let obj = {"name": "zhufeng"}; // JSON格式的对象，属性名和属性值都是用双引号包着；操作起来和普通对象没有任何区别。
// console.log(obj.name);
obj.name = "珠峰";
// console.log(obj);

// let str = '{"name": "珠峰"}'; // JSON格式的字符串

/*

* 我们从服务端获取的数据大多数情况下都是JSON格式，而且都是JSON格式的字符串。（其他格式例如XML，HTML）
* JSON格式：JSON是一种数据格式，不是一种数据类型。有两种情况，
*   1. JSON格式的对象，对象的属性名和属性值（数字例外）都用双引号括起来的，操作起来和普通对象没有任何区别；
*   2. JSON 格式的字符串，长得很像对象，并且属性值和属性名同样是用双引号括起来的一个字符串。
*
* window对象上有一个JSON对象，JSON对象下有2个方法：
*   1. JSON.parse() 把JSON格式的字符串转化为对象
*   2. JSON.stringify() 把对象转化为JSON格式的字符串
*
* */

// 2. 解析从服务端获取的数据

productData = JSON.parse(productData);
console.log(productData);

// 3. 数据绑定:基于我们从服务端获取的数据，把页面中需要的数据和html结构搞出来，最后把数据和html添加到页面中的指定容器中。

/*
* I. 字符串拼接类
*   1. 模板字符串 ``
*   2. 字符串拼接
*   3. 模板引擎：原理也是字符串拼接
*
* II. 动态创建DOM
*   createElement => appendChild
*   弊端：操作起来太麻烦，而且会引起DOM回流，造成过大的性能开销
*
/*
* <li><a href="javascript:;">
            <img src="img/1.jpg" alt="">
            <p>HUAWEI Mate 10 4GB+64GB 全网通版（亮黑色）</p>
            <span>￥3899</span>
        </a></li>
* */
let listBox = document.getElementById('list');
// for (let i = 0; i < productData.length; i++) {
//   let item = productData[i];
//   let li = document.createElement('li');
//   let a = document.createElement('a');
//   let img = document.createElement('img');
//   let p = document.createElement('p');
//   let span = document.createElement('span');
//
//   span.innerText = '￥' + item.price;
//   p.innerText = item.title;
//   img.src = item.img;
//
//   a.appendChild(img);
//   a.appendChild(p);
//   a.appendChild(span);
//
//   li.appendChild(a);
//
//   listBox.appendChild(li);
// }

let str = ``; // 模板字符串
// `bg${ i % 2}` 如果在模板字符串中使用变量，需要这种语法 ${变量}
// 模板字符串拼接也是+=
for (let i = 0; i < productData.length; i++) {
  let item = productData[i];
  str += `<li>
            <a href="javascript:;">
              <img src="${item.img}" alt="">
              <p>${item.title}</p>
              <span>￥${item.price}</span>
             </a>
           </li>`
}
// console.log(str);

// 把拼接好的html字符串插入到页面的指定容器中
listBox.innerHTML = str;
























