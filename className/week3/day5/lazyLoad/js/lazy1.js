/*
* 图片懒加载：真实项目中，为了提升页面的加载速度，我们一般将图片处理成延时加载（懒加载）；
* 效果：页面刚刚打开时，img标签就会根据src属性去请求图片资源。但是懒加载是页面打开时，不是直接加载图片，而是在合适的时机再去请求这个图片资源。
*
* 原理：img标签有一个src属性，只要img标签有这个属性就会向src这个属性值指向的图片资源请求这个图片。为了实现懒加载，我们先不给img标签设置src属性，等到合适的时机再给img设置src属性，img拿到src属性会立刻向属性指向图片资源发起请求。
*
*
* */

// FE Front Engineer 前端工程师
// 需求：页面刚刚打开的时候不加载图片，等点击按钮时才去加载图片。
// 1. 删除img标签的src属性即可实现页面打开时不请求图片。
// 2. 在按钮的点击事件触发时，给img标签设置src属性；
let img = document.getElementById('img');
let btn = document.getElementById('btn');
btn.onclick = function () {
  // 要为img设置src属性了。
  // 1. 获取自定义属性data-src的值
  let src = img.getAttribute('data-src');
  // 2.给img设置第一步获取来的值
  img.src = src; // 赋值之后img标签立刻会去下载src对应的图片，但是图片下载是异步的，需要一段时间才能下载完成
  // img.className = 'show'; // 在这里修改className，我们没有理会图片下载完成，

  // 为了避免图片下载失败而出现的小裂图，我们在图片下载完成后再设置show这个类名
  img.onload = function () {
    // onload 事件会在img图片下载完成后触发，所以我们可以在onload事件中设置img的类名，此时就可以实现在图片下载完成后再设置类名show
    this.className = 'show'
  }
};











