/*
* 真实项目中我们在处理图片懒加载问题时，不是直接操作页面上的img标签，而是动态创建一个img（document.createElement('img')），然后我们让新创建的img去尝试加载，如果加载成功（监听其onload事件，如果成功就会触发onload事件），这时我们再将页面中的img标签的src设置为图片资源路径
* 
* */

let img = document.getElementById('img');
let dataSrc = img.getAttribute('data-src');

window.onscroll = function () {
  // 在事件函数中计算图片何时进入浏览器的可视窗口
  let imgOffsetTop = img.offsetTop;
  let winScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let winH = document.documentElement.clientHeight || document.body.clientHeight;

  if (imgOffsetTop - winScrollTop - winH <= 100) {
    // 1. 新建一个img标签
    let newImg = document.createElement('img');
    // 2. 使用新建的img标签尝试加载图片
    newImg.src = dataSrc;
    // 3. 监听新建的img的onload事件
    newImg.onload = function () {
      // 如果onload事件触发了，说明我们尝试加载成功。这时让页面上的图片去加载资源。
      img.src = dataSrc; // 因为newImg尝试过了，确实可以成功，页面中的img可以去加载了。
      img.className = 'show'; //
      newImg = null;// 手动释放内存
    }
  }
};

/*
* lazyload.js
* 配合jquery使用的懒加载插件：https://github.com/gitastrophe/lazyload.js
* vue-lazyload.js
* 配合vue使用 https://github.com/hilongjw/vue-lazyload
*
* react-lazy-load：
* 配合react的懒加载工具 https://www.npmjs.com/package/react-lazy-load?tdsourcetag=s_pcqq_aiomsg
*
*
* */