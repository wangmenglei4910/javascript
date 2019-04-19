let flowRender = (function () {
	let isRun = false; // 标识符标识当前是否有正在进行的请求
	// 获取元素
	let flowList = document.querySelectorAll('#flowBox li');
	// 1. 请求数据的方法
	let page = 0;
	let queryData = () => {
		if (page > 3) {
			alert('没有更多数据了！');
			window.onscroll = null;
			return;
		}
		isRun = true;
		page++;
		let xhr = new XMLHttpRequest();
		xhr.open('GET', `json/data.json?page=${page}`, false);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
				let data = JSON.parse(xhr.responseText);
				bindHTML(data);
			}
		};
		xhr.send(null);
	};

	// 2. bindHTML
	function bindHTML(data) {
		for (let i = 0; i < data.length; i += 3) {
			let dataArr = [
				data[i],
				data[i + 1],
				data[i + 2]
			];
			// 给三列排序
			Array.from(flowList).sort(
				(a, b) => a.offsetHeight - b.offsetHeight
			).forEach((li, liIndex) => {
				dataArr[liIndex]
					? li.innerHTML += queryHTML(dataArr[liIndex])
					: null;
			});
		}
    isRun = false;
  }

	// 3. 拼接模板字符串
	function queryHTML({link, pic, title}) {
		return `<a href="${link}">
      <div>
        <img alt="" data-src="${pic}">
      </div>
      <span>${title}</span>
    </a>`
	}

	// 4. 加载更多
	function loadMore() {
		window.onscroll = function () {
			let pageH = document.documentElement.scrollHeight;
			let winScrollTop = document.documentElement.scrollTop;
			let winH = document.documentElement.clientHeight;
			if (pageH - winScrollTop - winH <= 100) {
				if (isRun) return;
				queryData();
			}
			lazyLoad();
		}
	}

	// 5. 图片懒加载
	function lazyLoad() {
		let imgList = document.querySelectorAll('img');
		[...imgList].forEach(item => {
			let imgOffsetTop = item.offsetTop;
			let winScrollTop = document.documentElement.scrollTop;
			let winH = document.documentElement.clientHeight;
			let dataSrc = item.getAttribute('data-src');
			if (
				imgOffsetTop - winScrollTop - winH <= 100 &&
				!item.src
			) {
				//!item.src => 优化点：如果图片没有src属性时，说明img还没进行过懒加载。如果图片已经有src属性说明已经被加载过了，就不需要再进行懒加载处理了。

				let newImg = document.createElement('img');
				newImg.src = dataSrc;
				newImg.onload = function () {
					item.src = dataSrc;
					newImg = null
				}
			}
		})
	}

	return {
		init() {
			queryData();
			lazyLoad();
			loadMore();
		}
	}
})();
flowRender.init();