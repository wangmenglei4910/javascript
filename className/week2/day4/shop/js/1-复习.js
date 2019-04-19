// 声明一个变量准备装ajax请求回来的数据
let productData = null;

// 利用ajax获取数据
let xhr = new XMLHttpRequest();
xhr.open('GET', 'json/product.json', false);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    productData = xhr.responseText; // xhr的responseText属性存储着从服务端获取的数据
  }
};
xhr.send(null);
// console.log(productData);
// console.log(typeof productData); // string

// JSON
// let obj = {"name": "珠峰"}; // obj 是一个JSON格式的对象，属性名和属性值都被双引号包着，操作起来和普通对象没有区别
// let str = '{"name": "zhufeng"}'; // str是一个JSON格式的字符串
// window.JSON 
// 1. JSON.parse() 把JSON格式的字符串转化对象
// 2. JSON.stringify() 把对象转化成JSON格式的字符串

// 2.解析从服务端获取的数据
productData = JSON.parse(productData);
console.log(productData);







