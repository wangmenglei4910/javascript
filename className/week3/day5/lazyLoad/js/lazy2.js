/*
* 真实项目中，大多数情况下是去监听页面的滚动事件（onscroll事件），在事件函数中计算这图片什么时候进入浏览器的可视窗口。一旦进入浏览器可视窗口，我们就去加载这张图片。
* 如何计算图片何时进入浏览器的可视窗口？
* 用图片距离body的偏移量（offsetTop是指元素距离最近的有定位属性的父级偏移参照物[offsetParent]的偏移量）- 滚动条卷去的高度 - 浏览器可视窗口的高度 为0时，就表示图片即将进入浏览器可视窗口。
* imgOffsetTop - winScrollTop - winH === 0
*
* */

let img = document.getElementById('img');
let dataSrc = img.getAttribute('data-src');

window.onscroll = function () {
  // 在事件函数中计算图片何时进入浏览器的可视窗口
  let imgOffsetTop = img.offsetTop;
  console.log(imgOffsetTop);
  let winScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let winH = document.documentElement.clientHeight || document.body.clientHeight;

  if (imgOffsetTop - winScrollTop - winH <= 100) {
    // 真实项目中，我们一般是提前一些让图片去加载，即图片距离出现在浏览器可视窗口还有一段距离的时候就去加载这张图片（imgOffsetTop - winScrollTop - winH > 0 就证明还有一段距离）。
    console.log('出来了');
    img.src = dataSrc;
    img.onload = function () {
      this.className = 'show';
    };
    img.onerror = function () {
      alert('加载失败');
    };
  }
};